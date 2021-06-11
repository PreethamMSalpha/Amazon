const User = require("../models/user");
const Token = require("../models/token");

const { check, validationResult } = require("express-validator");

var jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

var expressJwt = require("express-jwt");
var nodemailer = require("nodemailer");
const sendEmail = require("../utils/email/sendEmail");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "not able to save user in DB, user email already exists",
      });
    }

    const jwtToken = jwt.sign({ _id: user._id }, process.env.SECRET);

    // create a verification token for this user
    var token = new Token({
      userId: user._id,
      token: jwtToken,
    });

    //save the verification token
    token.save((err, result) => {
      if (err) {
        res.status(400).send({
          msg: err.message,
        });
      }

      // const link = `${process.env.URL}/confirmation?token=${token.token}&id=${user._id}`;
      const link = `${process.env.URL}/confirmation/${token.token}/${user._id}`;
      sendEmail(
        user.email,
        "Amazon account verification",
        { name: user.fullName, link: link },
        "/utils/template/confirmEmail.handlebars"
      );
      return link;
    });

    // res.send({
    //   name: user.fullName,
    //   email: user.email,
    //   id: user._id,
    // });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User email does not exist",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    //checking account verification
    if (!user.isVerified)
      return res.status(401).send({
        type: "not-verified",
        msg: "Your account has not been verified.",
      });

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 }); //TODO: change this expiring date later

    //send response to front end
    const { _id, fullName, email, role } = user;
    // res.send({ token: token, user: user.toJSON() });
    return res.json({ token, user: { _id, fullName, email, role } });
  });
};

exports.signout = (req, res) => {
  //clear cookie
  res.clearCookie("token");
  res.json({
    message: "User signout successful",
  });
};

exports.confirmationPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0].msg,
    });
  }

  //find a matching token
  Token.findOne({ token: req.body.token }, (err, token) => {
    if (!token) {
      return res.status(400).send({
        type: "not-verified",
        msg: "We were unable to find a valid token. Your token my have expired.",
      });
    }

    //finding matching user for this token
    User.findOne({ _id: token.userId, email: req.body.email }, (err, user) => {
      if (!user) {
        return res
          .status(400)
          .send({ msg: "We were unable to find a user for this token." });
      }
      if (user.isVerified) {
        return res.status(400).send({
          type: "already-verified",
          msg: "This user has already been verified.",
        });
      }

      // Verify and save the user
      user.isVerified = true;

      user.save((err) => {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        res.status(200).send("The account has been verified. Please log in.");
      });
    });
  });
};

exports.resendTokenPost = (req, res, next) => {
  // Check for validation errors
  var errors = req.validationErrors();

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0].msg,
    });
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res
        .status(400)
        .send({ msg: "We were unable to find a user with that email." });
    }
    if (user.isVerified) {
      return res.status(400).send({
        msg: "This account has already been verified. Please log in.",
      });
    }

    // Create a verification token, save it, and send email
    const jwtToken = jwt.sign({ _id: user._id }, process.env.SECRET);
    var token = new Token({
      userId: user._id,
      token: jwtToken,
    });

    // Save the token
    token.save((err) => {
      if (err) {
        return res.status(500).send({ msg: err.message });
      }

      const link = `${process.env.URL}/confirmation/${token.token}/${user._id}`;
      sendEmail(
        user.email,
        "Amazon account verification",
        { user: user.fullName },
        "../utils/template/confirmEmail.handlebars"
      );
      return link;
    });
  });
};

exports.requestPasswordReset = async (req, res) => {
  const errors = validationResult(req);
  const { email } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, async (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User email does not exist",
      });
    }

    const token = await Token.findOne({ userId: user._id });

    if (token) {
      await token.deleteOne();
    }

    //creating new random token
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(process.env.BCRYPT_SALT));

    //saving new token
    await new Token({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();

    const link = `${process.env.URL}/passwordReset?token=${resetToken}&id=${user._id}`;
    sendEmail(
      user.email,
      "Password reset request",
      { name: user.fullName, link: link },
      "../utils/template/requestResetPassword.handlebars"
    );
    return link;
  });
};

exports.resetPassword = async (userId, token, encry_password) => {
  let passwordResetToken = await Token.findOne({ userId });
  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }

  //comparing the token received by server with database
  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }

  //if they are same we create new hash password
  const hash = await bcrypt.hash(
    encry_password,
    Number(process.env.BCRYPT_SALT)
  );

  //updating new password
  await User.updateOne(
    { _id: userId },
    { $set: { encry_password: hash } },
    { new: true }
  );

  const user = await User.findOne({ _id: userId });
  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.name,
    },
    "../utils/template/resetPasswordSuccessful.handlebars"
  );
  await passwordResetToken.deleteOne();
  return true;
};

exports.confirmEmail = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()[0].msg,
      });
    }

    const { token, id } = req.params;
    Token.findOne({ token: token }, (err, token) => {
      if (!token) {
        return res.status(400).send({
          type: "not-verified",
          msg: "We were unable to find a valid token. Your token my have expired.",
        });
      }

      //finding matching user for this token
      User.findOne({ _id: id }, (err, user) => {
        if (!user) {
          return res
            .status(400)
            .send({ msg: "We were unable to find a user for this token." });
        }
        if (user.isVerified) {
          return res.status(400).send({
            type: "already-verified",
            msg: "This user has already been verified.",
          });
        }

        // Verify and save the user
        user.isVerified = true;

        user.save((err) => {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          res.status(200).send("The account has been verified. Please log in.");
        });
      });
    });
  } catch (error) {
    res.send("error");
  }
};

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

      const link = `${process.env.URL}/confirmation/${token.token}/${user._id}`;
      sendEmail(
        user.email,
        "Amazon account verification",
        { name: user.fullName, link: link },
        "/utils/template/confirmEmail.handlebars"
      );
      return link;
    });

    res.send({
      name: user.fullName,
      email: user.email,
      id: user._id,
    });
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

exports.resendTokenPost = (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);

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
        { name: user.fullName, link: link },
        "/utils/template/confirmEmail.handlebars"
      );
      // return link;
      res.json({
        msg: "Email cofirmation has been send to your email",
      });
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

    //creating new token
    const jwtToken = jwt.sign({ _id: user._id }, process.env.PASSWORD_RESET);

    await new Token({
      userId: user._id,
      token: jwtToken,
      createdAt: Date.now(),
    }).save();

    // console.log("token created");

    const link = `${process.env.URL}/passwordReset/${jwtToken}/${user._id}`;

    sendEmail(
      user.email,
      "Amazon Password reset request",
      { name: user.fullName, link: link },
      "/utils/template/requestResetPassword.handlebars"
    );
    return link;
  });

  res.status(200).json({
    msg: "Password reset request is successful, please check email",
  });
};

exports.resetPassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()[0].msg,
      });
    }

    const { token, id } = req.params;
    const password = req.body.password;

    let passwordResetToken = await Token.findOne({ userId: id });
    if (!passwordResetToken) {
      throw new Error("Invalid or expired password reset token");
    }

    //comparing the token received by server with database
    if (token !== passwordResetToken.token) {
      throw new Error("Invalid or expired password reset token");
    }

    //if they are same we create new hash password
    const user = await User.findOne({ _id: id });
    console.log("salt", user.salt);
    const hash = crypto
      .createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");
    console.log("hash password", hash);

    //updating new password
    await User.updateOne(
      { _id: id },
      { $set: { encry_password: hash } }
      // { new: true }
    );

    sendEmail(
      user.email,
      "Password Reset Successfully",
      {
        name: user.fullName,
      },
      "/utils/template/resetPasswordSuccessful.handlebars"
    );

    await passwordResetToken.deleteOne();

    res.status(200).json({
      msg: "password changed successfully",
    });
  } catch (error) {
    return res.send({
      msg: error,
    });
  }
};

const User = require("../models/user");
const Token = require("../models/token");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var nodemailer = require("nodemailer");

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
        err: "not able to save user in DB",
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

      //send the email
      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
      var mailOptions = {
        from: "no-reply@amazon.com",
        to: user.email,
        subject: "Amazon account verification",
        text:
          "Hello,\n\n" +
          "Please verify your account by clicking the link: \nhttp://" +
          process.env.URL +
          "/confirmation/" +
          token.token +
          ".\n",
      };
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          return res.status(500).send({
            msg: err.message,
          });
        }
        res
          .status(200)
          .send("A verification email has been sent to" + user.email + ".");
      });
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

      // Send the email
      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
      var mailOptions = {
        from: "no-reply@amazon.com",
        to: user.email,
        subject: "Amazon account verification",
        text:
          "Hello,\n\n" +
          "Please verify your account by clicking the link: \nhttp://" +
          process.env.URL +
          "/confirmation/" +
          token.token +
          ".\n",
      };
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        res
          .status(200)
          .send("A verification email has been sent to " + user.email + ".");
      });
    });
  });
};

var expressJwt = require("express-jwt");
var nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
  try {
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

    const source = fs.readFileSync(path.join(process.cwd(), template), "utf8");
    const compiledTemplate = handlebars.compile(source);

    var mailOptions = {
      from: "no-reply@amazon.com",
      to: email,
      subject: subject,
      html: compiledTemplate(payload),
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).send({
          msg: err.message,
        });
      }
      res.status(200).json({
        success: true,
      });
    });

    // console.log("send email");
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;

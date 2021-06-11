const { check, validationResult } = require("express-validator");

exports.signUpValidation = [
  check("fullName")
    .isLength({ min: 3 })
    .withMessage("name should be atleast 3 char"),
  check("email").isEmail().withMessage("please enter valid email"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("password should be atleast 5 chars long"),
  check("mobileNumber")
    .isLength(10)
    .withMessage("please enter valid mobile number"),
];

exports.signInValidation = [
  check("email").isEmail().withMessage("please enter valid email"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("please enter valid password"),
];

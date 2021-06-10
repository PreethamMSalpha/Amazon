var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");

const { signout, signin, signup } = require("../controllers/auth");

router.post(
  "/signup",
  [
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
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("please enter valid email"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("please enter valid password"),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;

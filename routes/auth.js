var express = require("express");
var router = express.Router();
// const { check, validationResult } = require("express-validator");
const validator = require("../middlewares/validators/userValidator");

const {
  signout,
  signin,
  signup,
  confirmationPost,
  resendTokenPost,
} = require("../controllers/auth");

router.post("/signup", validator.signUpValidation, signup);

router.post("/signin", validator.signInValidation, signin);

router.get("/signout", signout);

//email verification
router.post("/confirmation", confirmationPost); //token confirmation
router.post("/resend", resendTokenPost); //resend a new confirmation token

module.exports = router;

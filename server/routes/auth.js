var express = require("express");
var router = express.Router();
// const { check, validationResult } = require("express-validator");
const validator = require("../middlewares/validators/userValidator");

const {
  signout,
  signin,
  signup,
  resendTokenPost,
  confirmEmail,
  requestPasswordReset,
  resetPassword,
} = require("../controllers/auth");

router.post("/signup", validator.signUpValidation, signup);

router.post("/signin", validator.signInValidation, signin);

router.get("/signout", signout);

//email verification
router.get("/confirmation/:token/:id", confirmEmail); //token confirmation
router.post("/resend", resendTokenPost); //resend a new confirmation token

//password reset
router.post("/requestResetPassword", requestPasswordReset);
router.get("/passwordReset/:token/:id", resetPassword);

module.exports = router;

const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var validateEmail = function (email) {
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      maxlength: 32,
    },
    mobileNumber: {
      type: Number,
      required: true,
      maxlength: 10,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    addresses: {
      type: Array,
      default: [],
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    (this._password = password),
      (this.salt = uuidv1()),
      (this.encry_password = this.securePassword(password));
  })
  .get(function () {
    return this._password;
  });

userSchema.method = {
  authenticate: function (password) {
    return this.securePassword(password) === this.encry_password;
  },

  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
    return crypto
      .createHmac("sha256", this.salt)
      .update(plainPassword)
      .digest("hex");
  },
};

module.exports = mongoose.model("User", userSchema);

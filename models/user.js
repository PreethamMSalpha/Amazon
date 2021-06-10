const mongoose = require("mongoose");
const crypto = require("crypto");
// const uuidv1 = require("uuid/v1");
const { v1: uuidv1 } = require("uuid");

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
      required: true,
      unique: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
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

userSchema.methods = {
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

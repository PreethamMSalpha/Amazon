const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const tokenSchema = mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 3600, //TODO:reduce this expire date
  },
});

module.exports = mongoose.model("Token", tokenSchema);

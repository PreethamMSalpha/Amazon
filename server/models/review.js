const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const reqType = {
  type: String,
  required: true,
};

const reviewSchema = mongoose.Schema({
  title: reqType,
  description: reqType,
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: 0,
  },
  photos: {
    data: Buffer,
    contentType: String,
  },
  reviewedOn: Date,
});

module.exports = mongoose.model("Review", reviewSchema);

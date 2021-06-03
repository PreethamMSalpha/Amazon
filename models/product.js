const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const reqType = {
  type: String,
  required: true,
};

const productSchema = mongoose.model(
  {
    productName: reqType,
    brand: reqType,
    description: reqType,
    price: {
      type: Number,
      required: true,
      maxlength: 15,
      trim: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    images: {
      data: Buffer,
      contentType: String,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    seller: {
      type: ObjectId,
      ref: "Seller",
      required: true,
    },
    review: {
      type: ObjectId,
      ref: "Review",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(Product, productSchema);

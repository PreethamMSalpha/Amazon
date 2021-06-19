const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductCartSchema = mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
});

const orderSchema = mongoose.Schema(
  {
    products: [ProductCartSchema],
    transactionID: {},
    address: String,
    amount: Number,
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"],
      default: "Recieved",
    },
  },
  { timestamps: true }
);

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);
const Order = mongoose.model("Order", orderSchema);

module.exports = { ProductCart, Order };

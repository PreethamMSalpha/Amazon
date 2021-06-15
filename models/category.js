const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      enum: [
        "Mobiles",
        "Computers",
        "TV",
        "Appliances",
        "Electronics",
        "Men's Fashion",
        "Women's Fashion",
        "Home",
        "Kitchen",
        "Pets",
        "Beauty",
        "Health",
        "Grocery",
        "Sports",
        "Fitness",
        "Bags",
        "Luggage",
        "Toys",
        "Baby Products",
        "Kids' Fashion",
        "Car",
        "Motorbike",
        "Industrial",
        "Books",
        "Movies",
        "Music",
        "Video Games",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);

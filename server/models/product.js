const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 200,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 12,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
      enum: [
        "Tools",
        "Art",
        "Accessories",
        "Household",
        "FoodsAndBevarages",
        "Others",
      ],
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    userId: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

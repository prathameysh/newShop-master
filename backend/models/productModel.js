const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    required: true,
    default: 0.0,
  },
  MRP: {
    type: Number,
    default: 0,
    required: true,

  },
  off: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  aboutThisItem: {
    type: String,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      image: {
        type: String,
        required: [true, "image path is req in db"],
      },
    },
  ],
  category: {
    type: String,
    required: [true],
    enum: {
      values: [
        "Electronics",
        "Mobile Phones",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Clothes",
        "Shoes",
        "Misc",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
      ],
      message: "Please select correct category",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter product seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [20, "Product stock cannot exceed 20"],
    default: 10,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: String,
      email: String,
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

productSchema.pre("save", async function (next) {
  if (this.isModified("price") || this.isModified("MRP")) {
    this.price = this.price.toFixed(2);
    this.MRP = this.MRP.toFixed(2);
    this.off = Math.abs(((this.price - this.MRP) / this.MRP) * 100).toFixed(2);
  }
  next();
});

let schema = mongoose.model("Product", productSchema);

module.exports = schema;

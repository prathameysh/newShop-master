const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures");


// const fs = require("fs");
// let allPro = await Product.find(
//   {},
//   { _id: 0, createdAt: 0, "images._id": 0, "reviews._id": 0,__v:0 }
// );
// fs.writeFile("shopProductsOnDB.js", `let pro=[${allPro}]`, "utf-8", (err) =>
//   err ? console.log(err) : console.log("success")
// );

//Get Products - /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
  // const p = await Product.find({});
  // for (let i = 0; i < p.length; i++) {
  //   p[i].price--;
  //   p[i].save();
  //   console.log(1);
  // }
  const resPerPage = req.query.resPerPage || 24;

  let buildQuery = () => {
    return new APIFeatures(Product.find(), req.query).search().off().filter();
  };

  const filteredProductsCount = await buildQuery().query.countDocuments({});
  const totalProductsCount = await Product.countDocuments({});
  let productsCount = totalProductsCount;

  if (filteredProductsCount !== totalProductsCount) {
    productsCount = filteredProductsCount;
  }

  const products = await buildQuery().paginate(resPerPage).query;

  res.status(200).json({
    success: true,
    count: productsCount,
    resPerPage,
    products,
  });
});

//Create Product - /api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
  if (req.body.MRP < req.body.price) {
    return next(new ErrorHandler("MRP should be greater then price", 400));
  }

  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  let images = [];
  if (req.files.length > 0) {
    req.files.forEach((file) => {
      let url = `${BASE_URL}/uploads/product/${file.originalname}`;
      images.push({ image: url });
    });
  }
  if (req.body.imagesUrl) {
    images.push(...req.body.imagesUrl.split(",").map((v) => ({ image: v })));
  }

  req.body.images = images;

  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get Single Product - api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate(
    "reviews.user",
    "name email"
  );

  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }

  res.status(201).json({
    success: true,
    product,
  });
});

//Update Product - api/v1/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  if (req.body.MRP < req.body.price) {
    return next(new ErrorHandler("MRP should be greater then price", 400));
  }

  let product = await Product.findById(req.params.id);
  //uploading images
  let images = [];

  //if images not cleared we keep existing images
  if (req.body.imagesCleared === "false") {
    images = product.images;
  }

  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  console.log(req.files);
  if (req.files.length > 0) {
    req.files.forEach((file) => {
      let url = `${BASE_URL}/uploads/product/${file.originalname}`;
      images.push({ image: url });
    });
  }
  if (req.body.imagesUrl) {
    images.push(...req.body.imagesUrl.split(",").map((v) => ({ image: v })));
  }
  req.body.images = images;
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product - api/v1/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted!",
  });
});

//Create Review - api/v1/review
exports.createReview = catchAsyncError(async (req, res, next) => {
  const { user, email, productId, rating, comment } = req.body;

  const review = {
    user,
    email,
    rating,
    comment,
  };

  const product = await Product.findById(productId);
  //finding user review exists
  const isReviewed = product.reviews.find((review) => review.email == email);

  if (isReviewed) {
    //updating the  review
    product.reviews.forEach((review) => {
      if (review.email == email) {
        review.comment = comment;
        review.rating = rating;
        review.user = user;
        review.email = email;
      }
    });
  } else {
    //creating the review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / product.reviews.length;
  product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//Get Reviews - api/v1/reviews?id={productId}
exports.getReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id).populate(
    "reviews.user",
    "name email"
  );

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Review - api/v1/review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  //filtering the reviews which does match the deleting review id
  const reviews = product.reviews.filter((review) => {
    return review._id.toString() !== req.query.id.toString();
  });
  //number of reviews
  const numOfReviews = reviews.length;

  //finding the average with the filtered reviews
  let ratings =
    reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / reviews.length;
  ratings = isNaN(ratings) ? 0 : ratings;

  //save the product document
  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    numOfReviews,
    ratings,
  });
  res.status(200).json({
    success: true,
  });
});

//get admin products  -api/v1/products
exports.getAdminProduct = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).send({
    success: true,
    products,
  });
});

const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const productModel = require("../Models/productsModel");
const ApiError = require("../utils/apiError");

//get list of products
//route GET /api/v1/products
//access Public
exports.getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;
  const products = await productModel
    .find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  res
    .status(200)
    .json({ results: products.length, page: page, data: products });
});

//Get specific product
//route  GET /api/v1/product/id
//access public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel
    .findById(id)
    .populate({ path: "category", select: "name -_id" });
  if (!product) {
    return next(new ApiError(`No product for this id  ${id}`, 404));
    // res.status(404).json({msg :`No category for this id  ${id}`})
  }
  res.status(200).json({ data: product });
});

// create product
//route  POST  /api/v1/product
// access private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await productModel.create(req.body);
  res.status(201).json({ data: product });
});

// Update spacific product
//route PUT /api/v1/products/:id
//access private

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const product = await productModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(`No product for this id  ${id}`, 404));
    //  res.status(404).json({msg :`No category for this id  ${id}`})
  }
  res.status(200).json({ data: product });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndDelete(id);

  if (!product) {
    return next(new ApiError(`No product for this id  ${id}`, 404));

    // res.status(404).json({msg:`No category found `})
  }
  res.status(204).send();
});

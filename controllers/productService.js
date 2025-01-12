const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const productModel = require("../Models/productsModel");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("../controllers/handlerFactory");

//get list of products
//route GET /api/v1/products
//access Public
exports.getProducts = asyncHandler(async (req, res) => {
  //build query
  const documentCounts = await productModel.countDocuments();
  const apiFeatures = new ApiFeatures(productModel.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .limitFields()
    .search("Products")
    .sort();

  const { mongooseQuery, paginationResult } = apiFeatures;
  const products = await mongooseQuery;
  res
    .status(200)
    .json({ results: products.length, paginationResult, data: products });
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
exports.createProduct = factory.createOne(productModel);

// Update spacific product
//route PUT /api/v1/products/:id
//access private

exports.updateProduct = factory.updateOne(productModel);

exports.deleteProduct = factory.deleteOne(productModel);

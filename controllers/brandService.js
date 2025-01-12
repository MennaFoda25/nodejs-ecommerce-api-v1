const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const BrandModel = require("../Models/brandModel");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("../controllers/handlerFactory");
//get list of brands
//route GET /api/v1/brands
//access Public
exports.getBrands = asyncHandler(async (req, res) => {
  //build query
  const documentCounts = await BrandModel.countDocuments();
  const apiFeatures = new ApiFeatures(BrandModel.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .limitFields()
    .search()
    .sort();

  const { mongooseQuery, paginationResult } = apiFeatures;
  const brands = await mongooseQuery;

  res
    .status(200)
    .json({ results: brands.length, paginationResult, data: brands });
});

//Get specific brand
//route  GET /api/v1/brands/id
//access public
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await BrandModel.findById(id);
  if (!brand) {
    return next(new ApiError(`No brand for this id  ${id}`, 404));
    // res.status(404).json({msg :`No brand for this id  ${id}`})
  }
  res.status(200).json({ data: brand });
});

// create brand
//route  POST  /api/v1/categories
// access private
exports.createBrand = factory.updateOne(BrandModel);

// Update spacific brand
//route PUT /api/v1/brands/:id
//access private

exports.updateBrand = factory.updateOne(BrandModel);

exports.deleteBrand = factory.deleteOne(BrandModel);

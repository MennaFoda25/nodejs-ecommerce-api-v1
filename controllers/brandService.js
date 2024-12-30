const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const BrandModel = require("../Models/brandModel");
const ApiError = require("../utils/apiError");

//get list of brands
//route GET /api/v1/brands
//access Public
exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;
  const brands = await BrandModel.find({}).skip(skip).limit(limit);

  res.status(200).json({ results: brands.length, page: page, data: brands });
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
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await BrandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

// Update spacific brand
//route PUT /api/v1/brands/:id
//access private

exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await BrandModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    return next(new ApiError(`No brand for this id  ${id}`, 404));
    //  res.status(404).json({msg :`No brand for this id  ${id}`})
  }
  res.status(200).json({ data: brand });
});

exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await BrandModel.findByIdAndDelete(id);

  if (!brand) {
    return next(new ApiError(`No brand for this id  ${id}`, 404));

    // res.status(404).json({msg:`No brand found `})
  }
  res.status(204).send();
});

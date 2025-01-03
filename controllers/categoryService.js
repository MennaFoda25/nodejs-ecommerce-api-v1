const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const CategoryModel = require("../Models/categoryModel");
const ApiError = require("../utils/apiError");

//get list of categories
//route GET /api/v1/categories
//access Public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);

  res
    .status(200)
    .json({ results: categories.length, page: page, data: categories });
});

//Get specific category
//route  GET /api/v1/categories/id
//access public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  if (!category) {
    return next(new ApiError(`No category for this id  ${id}`, 404));
    // res.status(404).json({msg :`No category for this id  ${id}`})
  }
  res.status(200).json({ data: category });
});

// create category
//route  POST  /api/v1/categories
// access private
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// Update spacific category
//route PUT /api/v1/categories/:id
//access private

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    return next(new ApiError(`No category for this id  ${id}`, 404));
    //  res.status(404).json({msg :`No category for this id  ${id}`})
  }
  res.status(200).json({ data: category });
});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);

  if (!category) {
    return next(new ApiError(`No category for this id  ${id}`, 404));

    // res.status(404).json({msg:`No category found `})
  }
  res.status(204).send();
});

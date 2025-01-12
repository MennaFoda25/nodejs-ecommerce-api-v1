const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const CategoryModel = require("../Models/categoryModel");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("../controllers/handlerFactory");

//get list of categories
//route GET /api/v1/categories
//access Public
exports.getCategories = asyncHandler(async (req, res) => {
  const documentCounts = await CategoryModel.countDocuments();
  const apiFeatures = new ApiFeatures(CategoryModel.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .limitFields()
    .search()
    .sort();

  const { mongooseQuery, paginationResult } = apiFeatures;
  const categories = await mongooseQuery;

  res
    .status(200)
    .json({ results: categories.length, paginationResult, data: categories });
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

exports.updateCategory = factory.updateOne(CategoryModel);
exports.deleteCategory = factory.deleteOne(CategoryModel);

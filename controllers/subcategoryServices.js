const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Subcategory = require("../Models/subcategoryModel");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("../controllers/handlerFactory");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

exports.createFilterObj = (req, res, next) => {
  let filterObj = {};
  if (req.params.categoryId) filterObj = { category: req.params.categoryId };
  req.filterObject = filterObj;
  next();
};

// create subcategory
//route  POST  /api/v1/subcategories
// access private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subcategory = await Subcategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subcategory });
});

//get all categories
//route GET /api/v1/subcategories
//access public

exports.getAllSubcat = asyncHandler(async (req, res) => {
  const documentCounts = await Subcategory.countDocuments();
  const apiFeatures = new ApiFeatures(Subcategory.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .limitFields()
    .search()
    .sort();

  const { mongooseQuery, paginationResult } = apiFeatures;
  const subcat = await mongooseQuery;
  //.populate({ path: "category", select: "name -_id" });

  res
    .status(200)
    .json({ results: subcat.length, paginationResult, data: subcat });
});

//nested route
// GET /api/v1/categories/:categoryId/subcategories

//get specific category
//route GET /api/v1/subcategories/:id
//access public

exports.getSubcat = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcat = await Subcategory.findById(id);
  // .populate({
  //   path: "category",
  //   select: "name -_id",
  // });
  if (!subcat) {
    return next(new ApiError(`No subcategory found for this ${id}`, 404));
  }
  res.status(200).json({ data: subcat });
});

exports.updateSubcat = factory.updateOne(Subcategory)

exports.deleteSubcat = factory.deleteOne(Subcategory);

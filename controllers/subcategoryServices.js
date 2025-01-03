const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Subcategory = require("../Models/subcategoryModel");
const ApiError = require("../utils/apiError");

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
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;

  const subcat = await Subcategory.find(req.filterObject)
    .skip(skip)
    .limit(limit);
  //.populate({ path: "category", select: "name -_id" });

  res.status(200).json({ results: subcat.length, page: page, data: subcat });
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

exports.updateSubcat = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subcat = await Subcategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  if (!subcat) {
    return next(new ApiError(`No subcategory for this id  ${id}`, 404));
  }
  res.status(200).json({ data: subcat });
});

exports.deleteSubcat = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcat = await Subcategory.findByIdAndDelete(id);
  if (!subcat) {
    return next(new ApiError(`No subcategory for this id  ${id}`, 404));
  }
  res.status(204).send();
});

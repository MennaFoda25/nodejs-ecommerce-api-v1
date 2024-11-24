const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Subcategory = require("../Models/subcategoryModel");
const ApiError = require("../utils/apiError");

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
  const subcat = await Subcategory.find({}).skip(skip).limit(limit);

  res.status(200).json({ results: subcat.length, page: page, data: subcat });
});

//get specific category
//route GET /api/v1/subcategories/:id
//access public

exports.getSubcat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subcat = await Subcategory.findById(id);
  if (!subcat) {
    return next(new ApiError(`No subcategory found for this ${id}`, 404));
  }
  res.status(200).json({ data: subcat });
});

exports.updateSubcat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const subcat = await Subcategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!subcat) {
    return next(new ApiError(`No category for this id  ${id}`, 404));
  }
  res.status(200).json({ subcat });
});

exports.deleteSubcat = asyncHandler(async (req,res)=>{
const {id}= req.params;
const subcat = await Subcategory.findOneAndDelete()
})

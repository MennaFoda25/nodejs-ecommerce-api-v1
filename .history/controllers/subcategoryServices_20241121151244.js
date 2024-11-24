const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Subcategory = require("../Models/subcategoryModel");
const ApiError = require("../utils/apiError");

// create subcategory
//route  POST  /api/v1/subcategories
// access private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subcategory = await Subcategory.create({ name, slug: slugify(name), category });
  res.status(201).json({ data: subcategory });
});

//get all categories
//route GET /api/v1/subcategories
//access public

exports.getSubcat = asyncHandler( async (req,res)=>{
  const page =req.query.page*1 || 1
  const limit = req.query.limit || 5
  
  const subcat = 
})
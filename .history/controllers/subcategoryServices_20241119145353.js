const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubCategoryModel = require("../Models/subcategoryModel");
const ApiError = require("../utils/apiError");


// create subcategory 
//route  POST  /api/v1/categories
// access private
exports.createSubCategory=asyncHandler(async  (req,res)=>{
    const {name} = req.body;
    const category = await SubCategoryModel.create({name, slug: slugify(name)})
    res.status(201).json({data: category})
})

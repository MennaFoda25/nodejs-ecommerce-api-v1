const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubCategoryModel = require("../Models/subcategoryModel");
const ApiError = require("../utils/apiError");


// create category 
//route  POST  /api/v1/categories
// access private
exports.createCategory=asyncHandler(async  (req,res)=>{
    const {name} = req.body;
    const category = await CategoryModel.create({name, slug: slugify(name)})
    res.status(201).json({data: category})
})

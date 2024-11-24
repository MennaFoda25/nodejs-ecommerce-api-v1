const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const subcategory = require("../Models/subcategoryModel");
const ApiError = require("../utils/apiError");


// create subcategory 
//route  POST  /api/v1/subcategories
// access private
exports.createSubCategory= asyncHandler(async  (req,res)=>{
    const {name , category} = req.body;
    const subcategory = await subcategory.create({name, slug: slugify(name)})
    res.status(201).json({data: category})
})

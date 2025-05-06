const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const CategoryModel = require("../Models/categoryModel");
const { uploadSingleImage } = require("../middleWares/uploadImageMiddleware");
const factory = require("./handlerFactory");
//upload single image
exports.uploadCategoryImage = uploadSingleImage("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/categories/${filename}`);

    //save image into our db
    req.body.image = filename;
  }
  next();
});

//get list of categories
//route GET /api/v1/categories
//access Public
exports.getCategories = factory.getAll(CategoryModel);
//Get specific category
//route  GET /api/v1/categories/id
//access public
exports.getCategory = factory.getOne(CategoryModel);
// create category
//route  POST  /api/v1/categories
// access private
exports.createCategory = factory.createOne(CategoryModel);

// Update spacific category
//route PUT /api/v1/categories/:id
//access private

exports.updateCategory = factory.updateOne(CategoryModel);
exports.deleteCategory = factory.deleteOne(CategoryModel);

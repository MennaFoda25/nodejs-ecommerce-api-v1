const Subcategory = require("../Models/subcategoryModel");
const factory = require("../controllers/handlerFactory");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// Nested route
// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};
// create subcategory
//route  POST  /api/v1/subcategories
// access private
exports.createSubCategory = factory.createOne(Subcategory);
//get all categories
//route GET /api/v1/subcategories
//access public

exports.getAllSubcat = factory.getAll(Subcategory);

//nested route
// GET /api/v1/categories/:categoryId/subcategories

//get specific category
//route GET /api/v1/subcategories/:id
//access public

exports.getSubcat = factory.getOne(Subcategory);

exports.updateSubcat = factory.updateOne(Subcategory);

exports.deleteSubcat = factory.deleteOne(Subcategory);

const express = require("express");
const {
  createCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");
const {
  getCategories,
  getCategory,
  updateCategory,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryService");

const subcategoryRoute = require("./subcategoryRoute");

const router = express.Router();

router.use("/:categoryId/subcategories", subcategoryRoute); //law galk route zay dah ro7 3ala subcat

router
  .route("/")
  .get(getCategories)
  .post(createCategoryValidator, createCategory);

router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;

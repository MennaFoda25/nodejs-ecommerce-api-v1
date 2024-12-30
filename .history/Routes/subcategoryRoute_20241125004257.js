const express = require("express");

const {
  createSubCategory,
  getAllSubcat,
  getSubcat,
  updateSubcat,
  deleteSubcat,
} = require("../controllers/subcategoryServices");

const {
  createSubcatVali,
  getSubcatVali,
  updateSubcategoryVali,
  deleteSubcategoryVali,
} = require("../utils/validators/subcategoryValidator");

const router = express.Router({mergeParams});

router.route("/").post(createSubcatVali, createSubCategory).get(getAllSubcat);

router
  .route("/:id")
  .get(getSubcatVali, getSubcat)
  .put(updateSubcategoryVali, updateSubcat)
  .delete(deleteSubcategoryVali, deleteSubcat);

module.exports = router;

const express = require("express");

const {
  createSubCategory,
  getAllSubcat,
  getSubcat,updateSubcat
} = require("../controllers/subcategoryServices");

const {
  createSubcatVali,
  getSubcatVali,updateSubcategoryVali
} = require("../utils/validators/subcategoryValidator");

const router = express.Router();
router.route("/").post(createSubcatVali, createSubCategory).get(getAllSubcat);

router.route("/:id").get(getSubcatVali, getSubcat).put(updateSubcategoryVali,updateSubcat);

module.exports = router;

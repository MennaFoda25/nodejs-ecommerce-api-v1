const express = require("express");

const {
  createSubCategory,
  getAllSubcat,
  getSubcat,
} = require("../controllers/subcategoryServices");

const {
  createSubcatVali,
} = require("../utils/validators/subcategoryValidator");

const router = express.Router();
router.route("/").post(createSubcatVali, createSubCategory).get(getAllSubcat);

router.route("/:id").get();

module.exports = router;

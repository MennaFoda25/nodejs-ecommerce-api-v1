const express = require("express");

const {
  createSubCategory,
  getAllSubcat,
} = require("../controllers/subcategoryServices");

const {
  createSubcatVali,
} = require("../utils/validators/subcategoryValidator");

const router = express.Router();
router.route("/").post(createSubcatVali, createSubCategory).get(getAllSubcat);

router.route("/:id")

module.exports = router;

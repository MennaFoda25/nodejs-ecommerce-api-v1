const express = require("express");

const { createSubCategory } = require("../controllers/subcategoryServices");

const validator = require("../utils/validators/subcategoryValidator");

const router = express.outer;
router.route("/").post(validator, createSubCategory);

module.exports = router;

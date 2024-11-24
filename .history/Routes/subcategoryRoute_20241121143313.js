const express = require("express");

const { createSubCategory } = require("../controllers/subcategoryServices");

const validator = require("../utils/validators/subcategoryValidator");

const router = express.Router;
router.route("/").post(validator, createSubCategory);

module.exports = router;

const express = require("express");

const router = express.Router;
const { createSubCategory } = require("../controllers/subcategoryServices");

const validator = require('../utils/validators/subcategoryValidator')

router.route("/").post(validator,createSubCategory);

module.exports= router;

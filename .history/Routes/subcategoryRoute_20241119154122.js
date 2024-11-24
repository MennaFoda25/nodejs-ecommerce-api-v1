const express = require("express");

const router = express.Router;
const { createSubCategory } = require("../controllers/subcategoryServices");

const validator = require('')

router.route("/").post(createSubCategory);

module.exports= router;

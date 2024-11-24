const express = require("express");

const router = express.Router;
const { createSubCategory } = require("../controllers/subcategoryServices");

const validator

router.route("/").post(createSubCategory);

module.exports= router;

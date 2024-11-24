const express = require("express");

const router = express.Router;
const { createSubCategory } = require("../controllers/subcategoryServices");

const 

router.route("/").post(createSubCategory);

module.exports= router;

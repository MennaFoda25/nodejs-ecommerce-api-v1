const express = require("express");

const router = express.Router;
const { createSubCategory } = require("../controllers/subcategoryServices");

router.route('/').post
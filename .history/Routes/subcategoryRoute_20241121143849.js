const express = require("express");

const { createSubCategory } = require("../controllers/subcategoryServices");

const createSubcatVali = require("../utils/validators/subcategoryValidator");

const router = express.Router();
router.route("/").post(createSubcatVali, createSubCategory);

module.exports = router;

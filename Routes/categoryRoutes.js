const express = require('express');
const {getCategories,getCategory,updateCategory, createCategory, deleteCategory} = require("../controllers/categoryService")
const router = express.Router();

router.route('/')
.get(getCategories)
.post(createCategory);

router.route('/:id')
.get(getCategory)
.put(updateCategory)
.delete(deleteCategory);

module.exports = router;
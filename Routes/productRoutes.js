const express = require("express");
const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");
const {
  getProducts,
  getProduct,
  updateProduct,
  createProduct,
  deleteProduct,
  uploadImages,
  resizeProductImages,
} = require("../controllers/productService");

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(
    uploadImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  );

router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(uploadImages, resizeProductImages, updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;

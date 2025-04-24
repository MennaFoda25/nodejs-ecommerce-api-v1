const productModel = require("../Models/productsModel");
const factory = require("../controllers/handlerFactory");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const { uploadMixofImages } = require("../middleWares/uploadImageMiddleware");
const asyncHandler = require("express-async-handler");

exports.uploadImages = uploadMixofImages([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 5,
  },
]);

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  //console.log(req.files);
  //Image processing for image cover
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${imageCoverFileName}`);

    //save image into our db
    req.body.imageCover = imageCoverFileName;
  }

  //2-image processing for images
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${imageName}`);

        //save image into our db
        req.body.images.push(imageName);
      })
    );
    console.log(req.body.imageCover);
    console.log(req.body.images);
  }
  next();
});
//get list of products
//route GET /api/v1/products
//access Public
exports.getProducts = factory.getAll(productModel, "Products");
//Get specific product
//route  GET /api/v1/product/id
//access public
exports.getProduct = factory.getOne(productModel);
// create product
//route  POST  /api/v1/product
// access private
exports.createProduct = factory.createOne(productModel);

// Update spacific product
//route PUT /api/v1/products/:id
//access private

exports.updateProduct = factory.updateOne(productModel);

exports.deleteProduct = factory.deleteOne(productModel);

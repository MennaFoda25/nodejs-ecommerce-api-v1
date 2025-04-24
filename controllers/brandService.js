const { uploadSingleImage } = require("../middleWares/uploadImageMiddleware");
const sharp = require("sharp");
const factory = require("../controllers/handlerFactory");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const BrandModel = require("../Models/brandModel");

//upload single image
exports.uploadBrandImage = uploadSingleImage("image");

//image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${filename}`);

  //save image into our db
  req.body.image = filename;

  next();
});

//get list of brands
//route GET /api/v1/brands
//access Public
exports.getBrands = factory.getAll(BrandModel);

//Get specific brand
//route  GET /api/v1/brands/id
//access public
exports.getBrand = factory.getOne(BrandModel);

// create brand
//route  POST  /api/v1/categories
// access private
exports.createBrand = factory.createOne(BrandModel);

// Update spacific brand
//route PUT /api/v1/brands/:id
//access private

exports.updateBrand = factory.updateOne(BrandModel);

exports.deleteBrand = factory.deleteOne(BrandModel);

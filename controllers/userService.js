const bcrypt = require("bcryptjs");

const { v4: uuidv4 } = require("uuid");
const res = require("express/lib/response");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const factory = require("./handlerFactory");

const { uploadSingleImage } = require("../middleWares/uploadImageMiddleware");

const ApiError = require("../utils/apiError");

const userModel = require("../Models/userModel");

//upload single image
exports.uploadUserImage = uploadSingleImage("profileImg");

//Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
  //Image processing for image cover
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/users/${filename}`);

    //2- save image in DB
    req.body.profileImg = filename;
  }
  next();
});
//get list of Users
//route GET /api/v1/User
//access Public
exports.getUsers = factory.getAll(userModel, "Users");
//Get specific User
//route  GET /api/v1/User/id
//access public
exports.getUser = factory.getOne(userModel);
// create User
//route  POST  /api/v1/User
// access private
exports.createUser = factory.createOne(userModel);

// Update spacific user
//route PUT /api/v1/users/:id
//access private

exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      profileImg: req.body.profileImg,
      role: req.body.role,
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(
      new ApiError(`No ${document} for this id  ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ data: document });
});

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(
      new ApiError(`No ${document} for this id  ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ data: document });
});

exports.deleteUser = factory.deleteOne(userModel);

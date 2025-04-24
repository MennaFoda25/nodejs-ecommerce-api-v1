const multer = require("multer");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

//1-Disk storage
// const multerStorage = multer.diskStorage({
//   destination: function(req,file,cb){
//     cb(null, 'uploads/categories')
//   },
//   filename: function(req,file,cb){
//     // category-${id}-${date.now}-exe
//     const exe = file.mimetype.split("/")[1]
//     const filename = `category-${uuidv4()}-${Date.now()}.${exe}`
//     cb(null , filename)
//   },
// })

const multerOptions = () => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Only images are allowed", 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload;
};

exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);

exports.uploadMixofImages = (arrayofFields) => multerOptions().fields(arrayofFields);

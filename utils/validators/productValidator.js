const { check, body } = require("express-validator");
const categoryModel = require("../../Models/categoryModel");
const subcategoryModel = require("../../Models/subcategoryModel");
const validatorMiddleware = require("../../middleWares/validatorMiddleware");
const { default: slugify } = require("slugify");

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorMiddleware,
];

exports.createProductValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("title must be at least 3 ")
    .notEmpty()
    .withMessage("Product Required"),
  check("description")
    .notEmpty()
    .withMessage("Product description Required")
    .isLength({ max: 2000 })
    .withMessage("Description is too long"),
  check("quantity")
    .notEmpty()
    .withMessage("How many do you have?")
    .isNumeric()
    .withMessage("quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("number of sold products must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Product must have a price")
    .isNumeric()
    .withMessage("Price must be a number")
    .isLength({ max: 32 })
    .withMessage("price incorrect"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("price after discount must be number")
    .isFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error(
          "price after discount must be lower than original price"
        );
      }
      return true;
    }),
  check("colors").optional().isArray().withMessage("need array of colors"),
  check("imageCover").notEmpty().withMessage("cover image is required"),
  check("images").optional().isArray().withMessage("need array of images "),
  check("category")
    .notEmpty()
    .withMessage("product need a category")
    .isMongoId()
    .withMessage("no category for this Id")
    .custom((categoryId) =>
      categoryModel.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(`No category with this Id : ${categoryId}`);
        }
      })
    ),
  check("subcategory")
    .optional()
    .isMongoId()
    .withMessage("Invalid subcategory Id")
    .custom((value) =>
      subcategoryModel
        .find({ _id: { $exists: true, $in: value } })
        .then((result) => {
          if (result.length < 1 || result.length != value.length) {
            return Promise.reject(`No subcategory with this Id `);
          }
        })
    )
    .custom((val, { req }) =>
      subcategoryModel
        .find({ category: req.body.category })
        .then((subcategory) => {
          const subcategoriesIdsInDB = [];
          subcategory.forEach((subcat) => {
            subcategoriesIdsInDB.push(subcat._id.toString());
          });
          if (!val.every((v) => subcategoriesIdsInDB.includes(v))) {
            return Promise.reject(`No subcategory doesnot belong to category`);
          }
        })
    ),
  check("brand").optional().isMongoId().withMessage("Invalid brand Id"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("rating must be a number")
    .isLength({ min: 1 })
    .withMessage("rating must be above or equal 1")
    .isLength({ max: 5 })
    .withMessage("rating must be upto 5"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("rating quantity must be a number"),
  body("title").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),

  validatorMiddleware,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  body("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorMiddleware,
];

const { check, body } = require("express-validator");

const validatorMiddleware = require("../../middleWares/validatorMiddleware");
const { default: slugify } = require("slugify");

exports.createSubcatVali = [
  check("name")
    .notEmpty()
    .withMessage("need to have a name")
    .isLength({ min: 3 })
    .withMessage("Too short name")
    .isLength({ max: 32 })
    .withMessage("Too long"),
  check("category")
    .notEmpty()
    .withMessage("Subcategory needs a category")
    .isMongoId()
    .withMessage("Invalid Id/Category"),

  validatorMiddleware,
];

exports.getSubcatVali = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorMiddleware,
];

exports.updateSubcategoryVali = [
  check("id").isMongoId().withMessage("Invalid Id"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

exports.deleteSubcategoryVali = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorMiddleware,
];

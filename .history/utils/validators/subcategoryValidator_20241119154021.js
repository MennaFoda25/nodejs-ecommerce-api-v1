const check = require("express-validator");

const validatorMiddleware = require("../../middleWares/validatorMiddleware");

exports.createSubcatVali = [
  check("name").notEmpty().withMessage("need to have a name")
    .isLength({ min: 3 })
    .withMessage("Too short name")
    .isLength({ max: 32 })
    .withMessage("Too long"),
    check("category".isMongoId().withMessage("Invalid Id/Category"))

  validatorMiddleware,
];

// exports.getSubcategoryValidator = [
//     check('id').isMongoId().withMessage('Invalid Id'),
//      validatorMiddleware,
// ];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category Required")
    .isLength({ min: 3 })
    .withMessage("Too short name")
    .isLength({ max: 32 })
    .withMessage("Too long"),
  validatorMiddleware,
];

// exports.updateCategoryValidator = [
//     check('id').isMongoId().withMessage('Invalid Id'),
//     validatorMiddleware,
// ];

// exports.deleteCategoryValidator = [
//     check('id').isMongoId().withMessage('Invalid Id'),
//     validatorMiddleware,
// ];

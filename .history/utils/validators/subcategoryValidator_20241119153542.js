const check = require("express-validator");

const validator = require("../../middleWares/validatorMiddleware");

exports.createSubcatVali = [
  check("name").notEmpty().withMessage("need to have a name"),
  check('category'.notEmpty().withMessage('need a category')), 
  .isLength({min : 3}).withMessage('Too short name'),
  .isLength({max:32}).withMessage('Too long'),
  validatorMiddleware,
];
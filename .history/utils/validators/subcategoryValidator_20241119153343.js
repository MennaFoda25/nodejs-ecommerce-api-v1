const check = require("express-validator");

const validator = require("../../middleWares/validatorMiddleware");

exports.createSubcatVali = [
  check("name").notEmpty().withMessage("need to have a name"),
  check('category')];

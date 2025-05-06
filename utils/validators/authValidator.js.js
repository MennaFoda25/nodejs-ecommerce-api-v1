const { check } = require("express-validator");
const validatorMiddleware = require("../../middleWares/validatorMiddleware");
const { default: slugify } = require("slugify");
const User = require("../../Models/userModel");

exports.signupValidator = [
  check("name")
    .notEmpty()
    .withMessage("User Required")
    .isLength({ min: 3 })
    .withMessage("Too short name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("Please enter your email")
    .isEmail()
    .withMessage("Invalid email format")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Email is already used"));
        }
      })
    ),
  check("password")
    .notEmpty()
    .withMessage("please enter your password")
    .isLength({ min: 6 })
    .withMessage("Password is too short")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("Password Confirmation is incorrect");
      }
      return true;
    }),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("Please confirm your password"),
  validatorMiddleware,
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  check("password")
    .notEmpty()
    .withMessage("please enter your password")
    .isLength({ min: 6 })
    .withMessage("Password is too short"),
  validatorMiddleware,
];

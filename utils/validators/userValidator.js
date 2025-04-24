const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middleWares/validatorMiddleware");
const { default: slugify } = require("slugify");
const User = require("../../Models/userModel");
const bcrypt = require("bcryptjs");

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorMiddleware,
];

exports.createUserValidator = [
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

  check("phone")
    .optional()
    .isMobilePhone("ar-EG")
    .withMessage("Invalid phone number"),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("Please confirm your password"),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  body("name")
    .optional()
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
  check("phone")
    .optional()
    .isMobilePhone("ar-EG")
    .withMessage("Invalid phone number"),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("Please confirm your password"),
  validatorMiddleware,
];

exports.changeUserPasswordValidator = [
  check("id").isMongoId().withMessage("Invalid user"),
  body("currentPassword").notEmpty().withMessage("Enter your current password"),
  body("passwordConfirm").notEmpty().withMessage("Enter password again"),
  body("password")
    .notEmpty()
    .withMessage("Enter your new password")
    .custom(async (val, { req }) => {
      //verify current password
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("No user found for this ID");
      }

      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );

      if (!isCorrectPassword) {
        throw new Error("Inncorrect current password");
      }

      if (val !== req.body.passwordConfirm) {
        throw new Error("Password Confirmation is incorrect");
      }
      return true;
    }),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorMiddleware,
];

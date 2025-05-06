const express = require("express");
const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator.js");
const { signup, login } = require("../controllers/authService.js");

const router = express.Router();

router.route("/Signup").post(signupValidator, signup);
router.route("/Login").post(loginValidator, login);

// router
//   .route("/:id")
//   .get(getUserValidator, getUser)
//   .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
//   .delete(deleteUserValidator, deleteUser);

module.exports = router;

const express = require("express");
const {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator
} = require("../utils/validators/userValidator");
const {
  getUsers,
  getUser,
  updateUser,
  createUser,
  deleteUser,
  resizeImage,
  uploadUserImage,
  changeUserPassword,
} = require("../controllers/userService");

const router = express.Router();

router.put("/changePassword/:id", changeUserPasswordValidator, changeUserPassword);

router
  .route("/")
  .get(getUsers)
  .post(uploadUserImage, resizeImage, createUserValidator, createUser);

router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;

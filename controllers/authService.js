const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const ApiError = require("../utils/apiError");

const generateToken = (payLoad) =>
  jwt.sign({ userId: payLoad }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

exports.signup = asyncHandler(async (req, res, next) => {
  //1-create user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  //2- generate token
  const token = user._id;

  res.status(201).json({ data: user, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  // 1) check if password and email in the body (validation)
  // 2) check if user exist & check if password is correct
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }
  // 3) generate token
  const token = generateToken(user._id);

  // Delete password from response
  delete user._doc.password;
  // 4) send response to client side
  res.status(200).json({ data: user, token });
});


//make sure that the user is logged in
exports.protect = asyncHandler(async (req, res, next) => {
  //1)check if token exist, if yes get it
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ApiError("You need to login first", 401));
  }
  //2) verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  //3) check if user exist
  const currentUser = await User.findById(decoded.userId);

  if (!currentUser)
    return next(
      new ApiError("The user for this token is no longer exist", 401)
    );
  //4) check if user changed his password after token created
  if (currentUser.passwordChangedAt) {
    const passChanedTimeStamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    if (passChanedTimeStamp > decoded.iat) {
      return next(new ApiError("Password has changed please login again", 401));
    }
  }
  req.user = currentUser;
  next();
});

const ApiError = require("../utils/apiError");

const sendErrForDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrForProd = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const handleJWTInvalidSignature = () => new ApiError("Invalid token", 401);

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrForDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError") err = handleJWTInvalidSignature();
    sendErrForProd(err, res);
  }
};

module.exports = globalError;

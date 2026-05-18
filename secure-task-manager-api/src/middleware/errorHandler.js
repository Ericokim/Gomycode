const AppError = require("../utils/AppError");

function notFound(req, res, next) {
  next(new AppError(`Route ${req.originalUrl} was not found.`, 404));
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: err.status || "error",
    message: err.isOperational ? err.message : "Something went wrong."
  });
}

module.exports = {
  notFound,
  errorHandler
};

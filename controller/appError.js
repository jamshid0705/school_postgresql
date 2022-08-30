module.exports = function (err, req, res, next) {
  err.statusCode = err.statusCode || 404;
  err.status = err.status || "fail";
  err.message = err.message || "Not found";

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      statusCode: err.statusCode,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
};

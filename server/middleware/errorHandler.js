const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}`,
    "errLog.txt",
    `${err.status || 500} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
  console.error(err.stack);
};

module.exports = errorHandler;

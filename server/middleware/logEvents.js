const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName, fileName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  const logFile = path.join(__dirname, "..", "logs", logName);
  const fileExists = await fsPromises.exists(logFile);
  if (!fileExists) {
    await fsPromises.writeFile(logFile, logItem);
  } else {
    await fsPromises.appendFile(logFile, logItem);
  }

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }

    if (!fs.existsSync(path.join(__dirname, "..", "logs", fileName))) {
      await fsPromises.writeFile(
        path.join(__dirname, "..", "logs", fileName),
        logItem
      );
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logger, logEvents };

const fs = require("fs");

function logger(req, res, next) {
  const loggerFilePath = "server/data/loggerFile.txt";

  fs.appendFile(
    loggerFilePath,
    `--> New request ${req.method} ${req.path} at ${new Date()}\n`,
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
  next();
}

module.exports = {
  logger,
};

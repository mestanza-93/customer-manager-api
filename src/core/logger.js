const path = require("path");
const constants = require("../../constants");
const winston = require("winston");
const expressWinston = require("express-winston");
require("winston-mongodb");

const logger = function (req, res, next) {
  expressWinston.logger({
    transports: [
      new winston.transports.MongoDB({
        db: constants.MONGODB,
        options: { useUnifiedTopology: true },
        metaKey: "meta",
      }),
    ],
    format: winston.format.json({ space: 2 }),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true,
    colorize: true
  });
  next();
};
module.exports = logger;
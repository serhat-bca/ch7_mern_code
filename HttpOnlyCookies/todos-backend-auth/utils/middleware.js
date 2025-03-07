const logger = require("./logger");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const requestLogger = (req, res, next) => {
  logger.log(`Request Method: ${req.method}`);
  logger.log(`Request URL: ${req.url}`);
  const modifiedBody = req.body.password
    ? { ...req.body, password: "******" }
    : req.body;
  logger.log("Request body:", modifiedBody);
  logger.log("------------");
  next();
};

// middleware for error handling
const errorHandler = (error, req, res, next) => {
  logger.error("error message: ", error.message);
  if (error.name === "CastError") {
    return res.status(400).json({ error: "invalid id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "MongoServerError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: error.message });
  }
  next(error);
};

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "unauthorized" });
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
};

module.exports = { requestLogger, errorHandler, authenticateToken };

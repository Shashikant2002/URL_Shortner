const { default: rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
  message: "Too many requests, please try again later.",
});

module.exports = limiter;

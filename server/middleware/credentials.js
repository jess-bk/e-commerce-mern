const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", true);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    }

    if (req.method === "POST") {
      res.setHeader("Access-Control-Allow-Methods", "POST");
    }

    if (req.method === "PUT") {
      res.setHeader("Access-Control-Allow-Methods", "PUT");
    }

    if (req.method === "DELETE") {
      res.setHeader("Access-Control-Allow-Methods", "DELETE");
    }

    if (req.method === "GET") {
      res.setHeader("Access-Control-Allow-Methods", "GET");
    }

    next();
  }
};

module.exports = credentials;

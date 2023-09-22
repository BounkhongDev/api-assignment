
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];
  if (token) {
    // verifies SECRET and checks exp
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        return res.status(401).send({
          error: true,
          message: "Unauthorized access.",
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).send({
      error: true,
      message: "No token provided.",
    });
  }
};

const colors = require("colors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;

// auth middleware for JWT verification
exports.auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log({ token });
  if (!token || token === "null") {
    res.status(401).json({ error: true, statusCode: 401, message: "Please Login or Register" });
    console.log("Please Login or Register".red);
    return;
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log({err});
      res.status(401).json({ error: true, statusCode: 401, message: "Token Expired, Please Login" });
      console.log("Token Expired, Please Login".red);
      return;
    }
    console.log(decoded);
    next();
  });
};

const colors = require("colors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET; // Secret key for JWT

// auth middleware for JWT verification
exports.auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // get token from req.headers
  console.log({ token });
  if (!token || token === "null") {
    res.status(401).json({ error: true, statusCode: 401, message: "Please Login or Register" }); // error response
    console.log("Please Login or Register".red);
    return;
  }
  // token verification
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log({ err });
      res.status(401).json({ error: true, statusCode: 401, message: "Token Expired, Please Login" }); // error response
      console.log("Token Expired, Please Login".red);
      return;
    }
    console.log(decoded);
    next();
  });
};

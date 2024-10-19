const jwt = require("jsonwebtoken");
require("dotenv").config();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;
const expiresIn = "1d";

// create JWT Token function
exports.createJWT = async (data) => {
    console.log({ data });
    return jwt.sign(data, JWT_SECRET, { expiresIn });
};



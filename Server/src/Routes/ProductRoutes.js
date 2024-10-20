const express = require("express");
const { allProducts, getProductById } = require("../Controller/ProductController");
const { auth } = require("../Middleware/AuthMiddleware");
const router = express.Router();


router.get("/get_products",auth, allProducts); // get all products API
router.get("/:id",auth, getProductById); // get selected product by product id API

module.exports = router;

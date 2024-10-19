const express = require("express");
const { allProducts, getProductById } = require("../Controller/ProductController");
const { auth } = require("../Middleware/AuthMiddleware");
const router = express.Router();


router.get("/get_products",auth, allProducts);
router.get("/:id",auth, getProductById);

module.exports = router;

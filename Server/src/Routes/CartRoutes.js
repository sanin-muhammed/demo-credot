const express = require("express");
const { addCart, getAllCarts, deleteCart } = require("../Controller/CartController");
const { auth } = require("../Middleware/AuthMiddleware");
const router = express.Router();

router.post("/add", auth, addCart);
router.get("/:userId", getAllCarts);
router.delete("/delete/:id", deleteCart);

module.exports = router;

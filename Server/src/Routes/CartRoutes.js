const express = require("express");
const { addCart, getAllCarts, deleteCart } = require("../Controller/CartController");
const { auth } = require("../Middleware/AuthMiddleware");
const router = express.Router();

router.post("/add", auth, addCart); // add cart API
router.get("/:userId", getAllCarts); // find all carts API
router.delete("/delete/:id", deleteCart); // delete cart by id API

module.exports = router;

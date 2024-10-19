const express = require("express");
const { createOrder, getAllOrders } = require("../Controller/OrderController");
const { auth } = require("../Middleware/AuthMiddleware");
const router = express.Router();

router.post("/create", createOrder);
router.get("/:userId", auth, getAllOrders);

module.exports = router;

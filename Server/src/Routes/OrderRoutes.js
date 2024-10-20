const express = require("express");
const { createOrder, getAllOrders } = require("../Controller/OrderController");
const { auth } = require("../Middleware/AuthMiddleware");
const router = express.Router();

router.post("/create", createOrder); // create order API
router.get("/:userId", auth, getAllOrders); // get all orders by userId API

module.exports = router;

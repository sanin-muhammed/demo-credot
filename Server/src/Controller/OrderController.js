const Cart = require("../Models/Cart");
const Order = require("../Models/Order");

// @des: create order API
// method: POST
// api: /api/order/create
exports.createOrder = async (req, res) => {
  console.log("req body=", req.body);
  try {
    const { userId, products, totalPrice } = req.body;

    const newOrder = new Order({ userId, products, totalPrice }); // create new order
    if (newOrder) {
      await newOrder.save(); // save new order
      console.log("new Order =".bold, newOrder);

      res.status(200).json({ error: false, status: true, message: "Order successful" });// success response
      console.log("Order successful".yellow);

      const removeCart = await Cart.deleteMany({ userId });// remove the ordered cart 
    } else {
      res.status(400).json({ error: true, status: false, message: "Order creation failed" });// error response
      console.log("Order creation failed".red.bold);
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" });// error response
    console.log("server error", error);
  }
};

// @des: Get all orders API
// method: GET
// api: /api/order/:userId
exports.getAllOrders = async (req, res) => {
  console.log("req params=", req.params);
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }); // find orders using userId
    if (orders && orders.length > 0) {
      console.log("Orders =".bold, orders);

      res.status(200).json({ error: false, status: true, message: "Orders collected successful", data: orders });// success response
      console.log("Orders collected successful".yellow);
    } else {
      res.status(400).json({ error: true, status: false, message: "Orders not found" }); // error response
      console.log("Orders not found".red.bold);
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" }); // server error response
    console.log("server error", error);
  }
};

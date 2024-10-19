const Cart = require("../Models/Cart");

// @des: add product in cart API
// method: POST
// api: /api/cart/add
exports.addCart = async (req, res) => {
  console.log("req body =", req.body);
  try {
    const { userId, product, colour, memory, count } = req.body;

    const subTotal = product.price * count;
    const newCart = new Cart({ userId, product, colour, memory, count, subTotal });
    if (newCart) {
      await newCart.save();
      res.status(200).json({ error: false, status: true, message: "New cart added successfully" });
      console.log("New cart added successfully".yellow);
    } else {
      res.status(400).json({ error: true, status: false, message: "cart adding failed" });
      console.log("cart adding failed".red.bold);
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" });
    console.log("server error", error);
  }
};

// @des: get all carts API
// method: GET
// api: /api/cart/:userId

exports.getAllCarts = async (req, res) => {
  console.log("req params:", req.params);
  try {
    const { userId } = req.params;
    if (userId) {
      const carts = await Cart.find({ userId });
      if (carts && carts.length > 0) {
        res.status(200).json({ error: false, status: true, message: "Carts finded successfully", data: carts });
        console.log("Carts finded successfully".yellow);
      } else {
        res.status(404).json({ error: true, status: false, message: "Carts not found", });
        console.log("Carts not found".red.bold);
      }
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" });
    console.log("server error", error);
  }
};
// @des: Delete cart by ID API
// method: DELETE
// api: /api/cart/delete/:id

exports.deleteCart = async (req, res) => {
  console.log("req params:", req.params);
  try {
    const { id } = req.params;
    if (id) {
      const deletedCart = await Cart.findByIdAndDelete(id);
      if (deletedCart) {
        res.status(200).json({ error: false, status: true, message: "Cart deleted successfully" });
        console.log("Cart deleted successfully".yellow);
      } else {
        res.status(400).json({ error: true, status: false, message: "cart deletion failed" });
        console.log("cart deletion failed".red.bold);
      }
    } else {
      res.status(404).json({ error: true, status: false, message: "cart id is not found" });
      console.log("cart id is not found".red.bold);
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" });
    console.log("server error", error);
  }
};

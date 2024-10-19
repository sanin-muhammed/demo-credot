const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  product: {
    type: Object,
    required: true,
  },
  colour: {
    type: String,
    required: true,
  },
  memory: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  subTotal: {
    type: Number,
    required: true,
  },
});

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;

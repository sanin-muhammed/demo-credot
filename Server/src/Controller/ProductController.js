const Product = require("../Models/Product");

// @des: Get all products API
// method: GET
// api: /api/products/get_products
exports.allProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length > 0) {
      res.status(200).json({ error: false, status: true, message: "Products collected successfully", data: products });
      console.log("Products collected successfully".yellow);
    } else {
      res.status(404).json({ error: true, status: false, message: "No products found" });
      console.log("No products found".red.bold);
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" });
    console.log("server error", error);
  }
};

// @des: Get product by ID API
// method: GET
// api: /api/products/:id

exports.getProductById = async (req, res) => {
  console.log("req params =", req.params);
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      res.status(200).json({ error: false, status: true, message: "Product finded successfully", data: product });
      console.log("product>>>", product);
      console.log("Product finded successfully".yellow);
    } else {
      res.status(404).json({ error: true, status: false, message: "Product not found" });
      console.log("Product not found".red.bold);
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" });
    console.log("server error", error);
  }
};

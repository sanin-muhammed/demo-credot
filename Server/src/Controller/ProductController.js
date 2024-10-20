const Product = require("../Models/Product");

// @des: Get all products API
// method: GET
// api: /api/products/get_products
exports.allProducts = async (req, res) => {
  try {
    const products = await Product.find(); // find all products

    if (products.length > 0) {
      res.status(200).json({ error: false, status: true, message: "Products collected successfully", data: products }); // success response
      console.log("Products collected successfully".yellow);
    } else {
      res.status(404).json({ error: true, status: false, message: "No products found" }); // error response
      console.log("No products found".red.bold);
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" }); // server error response
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
    const product = await Product.findById(id); // find product by product id
    if (product) {
      res.status(200).json({ error: false, status: true, message: "Product finded successfully", data: product }); // success response
      console.log("product>>>", product);
      console.log("Product finded successfully".yellow);
    } else {
      res.status(404).json({ error: true, status: false, message: "Product not found" }); // error response
      console.log("Product not found".red.bold);
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "server error" }); // server error response
    console.log("server error", error);
  }
};

const express = require("express");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./src/Config/Database");
const AuthRoutes = require("./src/Routes/AuthRoutes");
const ProductRoutes = require("./src/Routes/ProductRoutes");
const CartRoutes = require("./src/Routes/CartRoutes");
const OrderRoutes = require("./src/Routes/OrderRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 2001; //port
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(morgan("dev"));

// Middleware to serve the Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

connectDB(); // connect database

// Setting up API endpoints
app.use("/api/auth", AuthRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/orders", OrderRoutes);

app.listen(PORT, () => {
  console.log("server running on port".bold, PORT.yellow.bold);
  
});

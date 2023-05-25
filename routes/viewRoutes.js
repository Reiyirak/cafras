const express = require("express");
const router = express.Router();
const path = require("path");
const fetch = require("isomorphic-fetch");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router.get("/", async (req, res) => {
  try {
    // Fetch the product data from the /api/products route
    const response = await fetch("http://localhost:5000/api/v1/products");
    const data = await response.json();
    const products = Array.isArray(data.products) ? data.products : [];

    // Render the products.ejs template and pass the products data
    res.render(path.join(__dirname, "..", "views", "index.ejs"), { products });
  } catch (error) {
    console.log(error);
  }
});

router.get("/products", async (req, res) => {
  try {
    // Fetch the product data from the /api/products route
    const response = await fetch("http://localhost:5000/api/v1/products");
    const data = await response.json();
    const products = Array.isArray(data.products) ? data.products : [];

    // Render the products.ejs template and pass the products data
    res.render(path.join(__dirname, "..", "views", "products.ejs"), { products });
  } catch (error) {
    console.log(error);
  }
});

// router
//   .route("/uploadImage")
//   .post([authenticateUser, authorizePermissions("admin")], uploadImage);

module.exports = router;

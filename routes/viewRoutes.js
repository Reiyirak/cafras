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

    const productsPerPage = 9;
    const currentPage = req.query.page ? parseInt(req.query.page) : 1;
    const skip = (currentPage - 1) * productsPerPage;

    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const slicedProducts = products.slice(skip, skip + productsPerPage);

    // Generate the pages array for pagination
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    // Render the products.ejs template and pass the products data
    res.render(path.join(__dirname, "..", "views", "products.ejs"), {
      products: slicedProducts,
      pages,
      currentPage,
      totalPages,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/details", async (req, res) => {
  try {
    res.render(path.join(__dirname, "..", "views", "details.ejs"));
  } catch (error) {
    console.log(error);
  }
});

// router
//   .route("/uploadImage")
//   .post([authenticateUser, authorizePermissions("admin")], uploadImage);

router.get("/routes", async (req, res) => {
  try {
    res.render(path.join(__dirname, "..", "views", "routes.ejs"));
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

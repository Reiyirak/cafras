const express = require("express");
const router = express.Router();
const path = require("path");
const fetch = require("isomorphic-fetch");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

// Route for the main page
router.get("/", authenticateUser, async (req, res) => {
  try {
    // Fetch the product data from the /api/products route
    const response = await fetch("http://localhost:5000/api/v1/products");
    const data = await response.json();
    const products = Array.isArray(data.products) ? data.products : [];

    // Render the products.ejs template and pass the products data
    res.render(path.join(__dirname, "..", "views", "index.ejs"), {
      products,
      userLoggedIn: req.isLoggedIn,
    });
  } catch (error) {
    console.log(error);
  }
});

// Route for the view of the products
router.get("/products", authenticateUser, async (req, res) => {
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
      userLoggedIn: req.isLoggedIn,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Route to render the user register view
router.get("/register", authenticateUser, async (req, res) => {
  try {
    if (req.isLoggedIn) {
      res.redirect("/");
    } else {
      res.render(path.join(__dirname, "..", "views", "register.ejs"));
    }
  } catch (error) {
    console.log(error);
  }
});

// Route for the user login view
router.get("/login", authenticateUser, async (req, res) => {
  try {
    if (req.isLoggedIn) {
      res.redirect("/");
    } else {
      res.render(path.join(__dirname, "..", "views", "login.ejs"));
    }
  } catch (error) {
    console.log(error);
  }
});

// Route to the cart
router.get("/cart", authenticateUser, (req, res) => {
  try {
    res.render(path.join(__dirname, "..", "views", "cart.ejs"), { userLoggedIn: req.isLoggedIn });
  } catch (error) {
    console.log(error);
  }
});

// Route to the profile
router.get("/profile", [authenticateUser, authorizePermissions("admin")], (req, res) => {
  try {
    res.render(path.join(__dirname, "..", "views", "profile.ejs"), { userLoggedIn: req.isLoggedIn, userAdmin: req.isAdmin });
  } catch (error) {
    console.log(error);
  }
});

// Route for the single product details view
router.get("/details/:id", authenticateUser, async (req, res) => {
  try {
    const productId = req.params.id;

    // Fetch the product data from the /api/products/:id route
    const response = await fetch(
      `http://localhost:5000/api/v1/products/${productId}`
    );
    const data = await response.json();
    const product = data.product;

    if (!product) {
      throw new Error("Product not found");
    }

    // Fetch the product reviews from the /api/products/:id/reviews route
    const reviewsResponse = await fetch(
      `http://localhost:5000/api/v1/products/${productId}/reviews`
    );
    const reviewsData = await reviewsResponse.json();
    const reviews = reviewsData.reviews || [];
    const countReviews = reviews.length;

    res.render(path.join(__dirname, "..", "views", "details.ejs"), {
      product,
      reviews,
      countReviews,
      userLoggedIn: req.isLoggedIn,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/products");
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

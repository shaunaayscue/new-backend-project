"use strict";
const express = require("express");
const ejs = require("ejs");
const multer = require("multer");

const productsRoutes = require("./routes/products.route");
const adminRoutes = require("./routes/admin.route");
const cartRoutes = require("./routes/cart.route");
const authRoutes = require("./auth/auth.route");
const bookstoreRoutes = require('./routes/bookstore.route');

const { db_close } = require("./models/db-conn");

const productModel = require("./models/products.model");
const adminModel = require("./models/admin.model");
const ensureAuth = require("./auth/auth.middleware");
const methodOverride = require('method-override')
const adminController = require("./controllers/admin.controller");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const session = require('express-session');
const passport = require('passport');
require("./auth/passport");
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views/ejs");

app.use("/products", productsRoutes);
app.use("/admin", adminRoutes);
app.use("/cart", cartRoutes);
app.use("/auth", authRoutes);
app.use('/api', bookstoreRoutes);

app.get('/', (req, res) => {
  req.session.returnTo = req.originalUrl;
  const featuredBooks = productModel.getBooksByFlag("featured", 1);
  const newReleases = productModel.getBooksByFlag("new_release", 1);
  const trendingBooks = productModel.getBooksByFlag("trending", 1);

  res.render("index", {
    title: "",
    featuredBooks,
    newReleases,
    trendingBooks,
    user: req.user  
  });
});

app.get("/products", (req, res) => {
  const { value: searchTerm, attribute: searchAttribute } = req.query;
  const categories = productModel.getAllCategories();

  if (searchTerm && searchAttribute) {
    const searchResults = productModel.searchProducts(searchAttribute, searchTerm);
    res.render("products", {
      products: [],
      searchResults,
      searchPerformed: true,
      categories: categories
    });
  } else {
    const products = productModel.getAllProducts();
    res.render("products", {
      title: "All Products",
      products,
      searchResults: [],
      searchPerformed: false,
      categories: categories
    });
  }
});

app.get('/products/all', (req, res) => {
  const products = productModel.getAllProducts();
  const categories = productModel.getAllCategories();
  res.render('products', { products, categories });
});

["/signup", "/login"].forEach(function(route) {
  app.get(route, function(req, res) {
      res.render(route.replace(new RegExp('^/|/([a-z/]+)$', 'g'), ""));
  });
});

app.get('/admin/products/bulk', ensureAuth, (req, res) => {
  res.render('admin-upload', { user: req.user }); 
});

app.get("/admin/products/edit/:product_id", ensureAuth, (req, res) => {
  const productId = req.params.product_id;
  const product = productModel.getProductById(productId);
  const categories = productModel.getAllCategories();

  if (!product) {
    return res.status(404).send("Product not found")
  }
  res.render("product-edit", { product, categories });
});

app.post('/admin/products/edit/:product_id', ensureAuth, (req, res, next) => {
  const { product_name, description, image_url, price, isbn, author, category_id, pages, publisher, featured, trending, new_release } = req.body;
  const productId = req.params.product_id;

  const params = [
    product_name, description, image_url, Number(price), isbn, author, Number(category_id), Number(pages), publisher,
    featured ? 1 : 0,
    trending ? 1 : 0,
    new_release ? 1 : 0,
    productId,
  ];
  try {
    adminModel.editProduct(params);
    res.redirect("/admin/products/list");
  } catch (err) {
    console.error("Error while editing product: ", err.message);
    next(err);
  }
});

app.get('/admin/products/delete/:product_id', ensureAuth, (req, res, next) => {
  try {
    const productId = req.params.product_id;
    adminModel.deleteProduct(productId);
    res.redirect("/admin/products/list");
  } catch (error) {
    next(error);
  }
});

app.use(methodOverride('_method'));
app.post('/admin/products/archive/:product_id', ensureAuth, (req, res, next) => {
  const productId = req.params.product_id;
  console.log("--- Archive Attempt ---");
  console.log("Product ID to archive:", productId);
  console.log("Request Parameters:", req.params);
  console.log("Request Body:", req.body); 
  try {
      const result = adminModel.archiveProduct(productId);
      console.log("Database Result:", result);
      res.redirect("/admin/products/list");
  } catch (error) {
      console.error("Error archiving product:", error);
      next(error);
  }
  console.log("--- Archive Attempt End ---");
});

app.get('/admin/products/list', ensureAuth, adminController.getAllProducts);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log("App listening at http://localhost:" + PORT)
);

process.on("SIGINT", () => {
  console.log("Terminate signal received.");
  db_close();
  console.log("...Closing HTTP server.");
  server.close(() => console.log("...HTTP server closed."));
});
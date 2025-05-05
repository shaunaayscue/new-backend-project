"use strict";
const express = require("express");
const ejs = require("ejs");
const multer = require("multer");

const productsRoutes = require("./routes/products.route");
const adminRoutes = require("./routes/admin.route");
const cartRoutes = require("./routes/cart.route");
const authRoutes = require("./auth/auth.route");
const bookstoreRoutes = require('./routes/bookstore.route');
const homeRoutes = require('./routes/home.route'); // Import home routes

const { db_close } = require("./models/db-conn");

const ensureAuth = require("./auth/auth.middleware");
const methodOverride = require('method-override');
const adminController = require("./controllers/admin.controller");
const productsController = require("./controllers/products.controller"); // Import products controller

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

app.use("/", homeRoutes);
app.use("/products", productsRoutes);
app.use("/admin", adminRoutes);
app.use("/cart", cartRoutes);
app.use("/auth", authRoutes);
app.use('/api', bookstoreRoutes);

["/signup", "/login"].forEach(function(route) {
  app.get(route, function(req, res) {
    res.render(route.replace(new RegExp('^/|/([a-z/]+)$', 'g'), ""));
  });
});

app.get('/admin/products/bulk', ensureAuth, (req, res) => {
  res.render('admin-upload', { user: req.user });
});

app.get("/admin/products/edit/:product_id", ensureAuth, adminController.editProductForm);

app.post('/admin/products/edit/:product_id', ensureAuth, adminController.editProduct);


app.get('/admin/products/delete/:product_id', ensureAuth, adminController.deleteProduct);

app.use(methodOverride('_method'));
app.post('/admin/products/archive/:product_id', ensureAuth, adminController.archiveProduct);

app.get('/admin/products/list', ensureAuth, adminController.getAllProducts);

app.get("/products", productsController.getAllProductsPage);
app.get('/products/all', productsController.getAllProducts);

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
"use strict";
const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const productsRoutes = require("./routes/products.route");
const adminRoutes = require("./routes/admin.route");
const cartRoutes = require("./routes/cart.route");

const { db_close } = require("./models/db-conn");

app.use(express.static("public"));
app.use("/products", productsRoutes);
app.use("/admin", adminRoutes);
app.use("/cart", cartRoutes);

app.get("/", (req, res) => {
    res.redirect("/products/all");
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, function () {
  console.log("App listening at http://localhost:" + PORT);
});

process.on("SIGINT", cleanUp);
function cleanUp() {
  console.log("Terminate signal received.");
  db_close();
  console.log("...Closing HTTP server.");
  server.close(() => {
    console.log("...HTTP server closed.")
  })
}
"use strict";
const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products.controller");

//http://localhost:3000/products/all
router.get("/all", productsController.getAllProducts);

//http://localhost:3000/products/5
router.get("/:product_id", productsController.getProductById);

//http://localhost:3000/products?category_name=Fiction
//http://localhost:3000/products?attribute=product_name&value=Handmaid
//http://localhost:3000/products?attribute=product_name&value=Handmaid&category_name=Fiction
router.get("/", productsController.searchProducts);

module.exports = router;
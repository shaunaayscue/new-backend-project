"use strict";
const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products.controller");
const ensureAuth = require("../auth/auth.middleware");
const cartController = require("../controllers/cart.controller");

//http://localhost:3000/products?category_name=Fiction
//http://localhost:3000/products?attribute=product_name&value=Handmaid
//http://localhost:3000/products?attribute=product_name&value=Handmaid&category_name=Fiction
router.get("/", productsController.searchProducts);

//http://localhost:3000/products/all
router.get("/all", productsController.getAllProducts);

router.get("/cart", ensureAuth, cartController.viewCart);

//http://localhost:3000/products/5
router.get("/:product_id", productsController.getProductById);

router.get('/genres', productsController.getGenresBySearch);

module.exports = router;
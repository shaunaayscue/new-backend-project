"use strict";
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");const ensureAuth = require("../auth/auth.middleware");

//http://localhost:3000/cart/add
router.post("/add", ensureAuth, cartController.addToCart);

//http://localhost:3000/cart/products/delete/1
router.delete("/products/delete/:product_id", ensureAuth, cartController.removeFromCart);

//http://localhost:3000/cart/1/checkout
router.post("/:user_id/checkout", ensureAuth, cartController.checkout);

// In your cart.routes.js
router.post("/:user_id/products/update/:product_id", ensureAuth, cartController.updateCartItemQuantity);

router.get("/orders", ensureAuth, cartController.getOrderHistory);

router.post("/:user_id/abandon", ensureAuth, cartController.abandonCart);

module.exports = router;

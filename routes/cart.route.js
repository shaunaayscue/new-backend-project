"use strict";
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

//http://localhost:3000/cart/add
router.post("/add", cartController.addToCart);

//http://localhost:3000/cart/1/products/delete/12
router.delete("/:user_id/products/delete/:product_id", cartController.removeProductFromCart);

//http://localhost:3000/cart/1/checkout
router.post("/:user_id/checkout", cartController.checkout);

module.exports = router;

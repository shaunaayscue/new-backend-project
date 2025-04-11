"use strict";
const cartModel = require("../models/cart.model");

function addToCart(req, res, next) {
    let user_id = req.body.user_id;
    let product_id = req.body.product_id;
    let quantity = req.body.quantity;
    if (!user_id || !product_id || !quantity || quantity <= 0) {
        return res.status(400).send("Invalid Request");
    }
    try {
        const result = cartModel.addToCart(user_id, product_id, quantity);
        res.json({ success: true, result });
    } catch (err) {
        console.error("Error adding to cart:", err.message);
        next(err);
    }
}

function removeProductFromCart(req, res, next) {
    let user_id = req.params.user_id;
    let product_id = req.params.product_id;
    if (!user_id || !product_id) {
        return res.status(400).send("Invalid Request");
    }
    try {
        const result = cartModel.removeProductFromCart(user_id, product_id);
        res.json({ success: true, result });
    } catch (err) {
        console.error("Error removing product from cart:", err.message);
        next(err);
    }
}

function checkout(req, res, next) {
    let user_id = req.params.user_id;
    if (!user_id) {
        return res.status(400).send("Invalid Request");
    }
    try {
        let result = cartModel.checkout(user_id);
        res.json({ success: true, result });
    } catch (err) {
        console.error("Error during checkout:", err.message);
        next(err);
    }
}

module.exports = {
    addToCart,
    removeProductFromCart,
    checkout,
};
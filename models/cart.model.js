"use strict";
const db = require("./db-conn");

function addToCart(user_id, product_id, quantity) {
    let cart = db.get("SELECT * FROM Carts WHERE user_id = ? AND cart_status = 'new'", user_id);
    if (!cart) {
        db.run("INSERT INTO Carts (user_id, cart_status) VALUES (?, 'new')", user_id);
        cart = db.get("SELECT * FROM Carts WHERE user_id = ? AND cart_status = 'new'", user_id);
    }
    let selectCartProductSql = "SELECT * FROM CartProducts WHERE cart_id = ? AND product_id = ?";
    const existing = db.get(selectCartProductSql, [cart.cart_id, product_id]);
    let info;
    if (existing) {
        let updateCartProductSql = "UPDATE CartProducts SET quantity = quantity + ? WHERE cart_id = ? AND product_id = ?";
        let params = [
            quantity, 
            cart.cart_id, 
            product_id
        ];
        info = db.run(updateCartProductSql, params);
    } else {
        let insertCartProductSql = "INSERT INTO CartProducts (cart_id, product_id, quantity) VALUES (?, ?, ?)";
        let params = [
            cart.cart_id, 
            product_id, 
            quantity
        ];
        info = db.run(insertCartProductSql, params);
    }
    return info; 
}

function removeProductFromCart(user_id, product_id) {
    let cart = db.get("SELECT * FROM Carts WHERE user_id = ? AND cart_status = 'new'", user_id);
    if (!cart) {
        return { success: false, message: "No active cart found for user" };
    }
    const result = db.run("DELETE FROM CartProducts WHERE cart_id = ? AND product_id = ?", [cart.cart_id, product_id]);
    return result;
}

function checkout(user_id) {
    let cart = db.get("SELECT * FROM Carts WHERE user_id = ? AND cart_status = 'new'", user_id);
    if (!cart) {
        return { success: false, message: "No active cart found for user" };
    }
    db.run("DELETE FROM CartProducts WHERE cart_id = ?", cart.cart_id);
    db.run("UPDATE Carts SET cart_status = 'purchased' WHERE cart_id = ?", cart.cart_id);
    return { success: true, message: "Checkout successful" };
}

module.exports = {
    addToCart,
    removeProductFromCart,
    checkout,
};
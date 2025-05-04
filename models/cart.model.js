"use strict";
const db = require("./db-conn");

function addToCart(user_id, product_id, quantity) {
    let cart = db.get("SELECT * FROM Carts WHERE user_id = ? AND cart_status = 'new';", user_id);
    if (!cart) {
        db.run("INSERT INTO Carts (user_id, cart_status) VALUES (?, 'new');", user_id);
        cart = db.get("SELECT * FROM Carts WHERE user_id = ? AND cart_status = 'new';", user_id);
    }
    let selectCartProductSql = "SELECT * FROM CartProducts WHERE cart_id = ? AND product_id = ?;";
    const existing = db.get(selectCartProductSql, [cart.cart_id, product_id]);
    let info;
    if (existing) {
        let updateCartProductSql = "UPDATE CartProducts SET quantity = quantity + ? WHERE cart_id = ? AND product_id = ?;";
        let params = [
            quantity,
            cart.cart_id,
            product_id
        ];
        info = db.run(updateCartProductSql, params);
    } else {
        let insertCartProductSql = "INSERT INTO CartProducts (cart_id, product_id, quantity) VALUES (?, ?, ?);";
        let params = [
            cart.cart_id,
            product_id,
            quantity
        ];
        info = db.run(insertCartProductSql, params);
    }
    return info;
}

function removeFromCart(product_id, user_id) {
    const cart = db.get("SELECT cart_id FROM Carts WHERE user_id = ? AND cart_status = 'new';", user_id);
    if (!cart) {
        throw new Error("Cart not found for the user");
    }

    const cart_id = cart.cart_id;
    const sqlDeleteProduct = "DELETE FROM CartProducts WHERE cart_id = ? AND product_id = ?;";
    db.run(sqlDeleteProduct, [cart_id, product_id]);

    return { success: true };
}

function checkout(user_id) {
    let cart = db.get("SELECT * FROM Carts WHERE user_id = ? AND cart_status = 'new';", user_id);
    if (!cart) {
        return { success: false, message: "No active cart found for user" };
    }
    db.run("DELETE FROM CartProducts WHERE cart_id = ?;", cart.cart_id);
    db.run("UPDATE Carts SET cart_status = 'purchased' WHERE cart_id = ?;", cart.cart_id);
    return { success: true, message: "Checkout successful" };
}


function updateCartItemQuantity(user_id, product_id, quantity) {
    if (typeof user_id !== 'number' || typeof product_id !== 'number' || typeof quantity !== 'number') {
        console.log('Invalid data types:', { user_id, product_id, quantity });
        throw new Error('Invalid data types');
    }

    try {
        const cart = db.get("SELECT cart_id FROM Carts WHERE user_id = ? AND cart_status = 'new';", [user_id]);

        if (!cart) {
            console.log('Model - No active cart found for user:', user_id);
            return { success: false, message: 'No active cart found.' };
        }

        const result = db.run(
            "UPDATE CartProducts SET quantity = ? WHERE cart_id = ? AND product_id = ?;",
            [quantity, cart.cart_id, product_id]
        );

        if (result.changes > 0) {
            console.log('Model - Cart updated successfully.');
            return { success: true };
        } else {
            console.log('Model - No changes made to the cart.');
            return { success: false, message: 'Failed to update the cart.' };
        }
    } catch (error) {
        console.error('Model - Database error during quantity update:', error);
        return { success: false, message: 'Database error' };
    }
}

function getCartWithProducts(user_id) {
    try {
        const cart = db.get("SELECT cart_id FROM Carts WHERE user_id = ? AND cart_status = 'new';", [user_id]);
        if (cart) {
            const rows = db.all("SELECT cp.quantity, p.product_id, p.product_name, p.author, p.price, p.image_url FROM CartProducts cp JOIN Products p ON cp.product_id = p.product_id WHERE cp.cart_id = ?;", [cart.cart_id]);
            return rows;
        }
        return [];
    } catch (error) {
        console.error('Model - Error fetching cart products:', error);
        return [];
    }
}

function createOrder(orderData) {
    try {
        const result = db.run("INSERT INTO Orders (user_id, total) VALUES (?, ?);",
            [orderData.user_id, orderData.total]
        );
        console.log('Order creation result (from model):', result);
        return { lastID: result.lastInsertRowid };
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}

function addOrderItem(orderId, productId, quantity, priceAtPurchase) {
    try {
        db.run("INSERT INTO OrderItems (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?);",
            [orderId, productId, quantity, priceAtPurchase]
        );
    } catch (error) {
        console.error('Error adding order item:', error);
        throw error;
    }
}

function getOrdersByUserId(userId) {
    try {
        const orders = db.all(
            "SELECT o.order_id,  o.order_date, o.total FROM Orders o WHERE o.user_id = ? ORDER BY o.order_date DESC;",
            [userId]
        );

        for (const order of orders) {
            const items = db.all("SELECT p.product_name, p.author, oi.quantity, oi.price_at_purchase, p.image_url FROM OrderItems oi JOIN Products p ON oi.product_id = p.product_id WHERE oi.order_id = ?;",
                [order.order_id]
            );
            order.items = items;
        }

        return orders;
    } catch (error) {
        console.error('Error fetching orders by user ID:', error);
        throw error;
    }
}

function abandonCart(userId) {
    try {
        const result = db.run("UPDATE Carts SET cart_status = 'abandoned' WHERE user_id = ? AND cart_status = 'new';", [userId]);
        return { success: result.changes > 0 };
    } catch (error) {
        console.error('Error abandoning cart in database:', error);
        throw error;
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    checkout,
    getCartWithProducts,
    updateCartItemQuantity,
    createOrder,
    addOrderItem,
    getOrdersByUserId,
    abandonCart,
};
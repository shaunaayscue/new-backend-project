"use strict";
const cartModel = require("../models/cart.model");

function addToCart(req, res, next) {
    console.log('req.user:', req.user); 
    console.log('req.body:', req.body); 

    const user_id = req.user.user_id;
    const { product_id } = req.body;
    const quantity = 1;

    console.log('Calling cartModel.addToCart with:', user_id, product_id, quantity); 

    if (!user_id || !product_id) {
        return res.status(400).json({ error: "Product ID and User ID are required." });
    }

    try {
        cartModel.addToCart(user_id, product_id, quantity);
        res.status(200).json({ message: "Item added to cart successfully." });
    } catch (err) {
        console.error("Error adding to cart:", err.message);
        res.status(500).json({ error: "Failed to add item to cart." });
        next(err);
    }
}

function removeFromCart(req, res, next) {
    const productId = req.params.product_id;
    const userId = req.user.user_id;

    console.log("Attempting to remove product:", productId, "from user:", userId);

    try {
        const result = cartModel.removeFromCart(productId, userId);

        if (result.success) {
            res.status(200).send("Product removed from cart successfully");
        } else {
            res.status(404).send("Product not found in cart");
        }
    } catch (err) {
        console.error("Error while removing product from cart: ", err.message);
        next(err);
    }
}

function checkout(req, res, next) {
    const userId = req.user.user_id;

    try {
        const cartItems = cartModel.getCartWithProducts(userId);

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: 'Your cart is empty.' });
        }

        let total = 0;
        const orderItemsData = [];

        for (const item of cartItems) {
            total += item.price * item.quantity;
            orderItemsData.push({
                product_id: item.product_id,
                quantity: item.quantity,
                price_at_purchase: item.price
            });
        }
        const orderResult = cartModel.createOrder({ user_id: userId, total: total });
        const orderId = orderResult.lastID;

        console.log("Order created with ID:", orderId);

        if (!orderId) {
            return res.status(500).json({ error: 'Failed to create order.' });
        }
        for (const item of orderItemsData) {
            console.log("Adding order item - Order ID: " + orderId + " Product ID: " + item.product_id + " Quantity: " + item.quantity + " Price: " + item.price_at_purchase);
            cartModel.addOrderItem(orderId, item.product_id, item.quantity, item.price_at_purchase);
        }
        const result = cartModel.checkout(userId);

        if (!result.success) {
            return res.status(500).json({ error: 'Order placed, but cart cleanup failed.' });
        }

        res.status(200).json({ message: 'Order placed successfully!' });

    } catch (err) {
        console.error("Checkout failed:", err.message);
        next(err);
    }
}

function viewCart(req, res, next) {
    const user_id = req.user.user_id;
    console.log('viewCart function called for user:', user_id);
    try {
        const cartItemsWithProducts = cartModel.getCartWithProducts(user_id);
        console.log('cartItemsWithProducts:', cartItemsWithProducts);
        res.render("cart", { cart: cartItemsWithProducts, user: req.user }); 
    } catch (err) {
        console.error("Error fetching cart:", err.message);
        next(err);
    }
}

function updateCartItemQuantity(req, res, next) {
    const userId = parseInt(req.params.user_id, 10);
    const productId = parseInt(req.params.product_id, 10);
    const quantity = parseInt(req.body.quantity, 10);

    if (!Number.isInteger(userId) || !Number.isInteger(productId) || !Number.isInteger(quantity) || quantity < 1) {
        console.error('Invalid input types:', { userId, productId, quantity });
        return res.status(400).json({ error: 'Invalid input types or quantity' });
    }

    try {
        const result = cartModel.updateCartItemQuantity(userId, productId, quantity);
        if (result.success) {
            const updatedCart = cartModel.getCartWithProducts(userId);
            const updatedItem = updatedCart.find(item => item.product_id === productId);
            let subtotal = 0;
            updatedCart.forEach(item => {
                subtotal += item.price * item.quantity;
            });
            const taxRate = 0.0675;
            const tax = subtotal * taxRate;
            const deliveryFee = subtotal > 0 ? 3.00 : 0.00;
            const total = subtotal + tax + deliveryFee;

            return res.json({
                message: 'Cart updated successfully',
                updatedItemTotal: updatedItem ? updatedItem.price * updatedItem.quantity : 0,
                subtotal: subtotal,
                tax: tax,
                deliveryFee: deliveryFee,
                total: total,
            });
        } else {
            return res.status(404).json({ error: result.message });
        }
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        return res.status(500).json({ error: 'Database error' });
    }
}

function getOrderHistory(req, res, next) {
    const userId = req.user.user_id;

    try {
        const orders = cartModel.getOrdersByUserId(userId);
        console.log('Orders fetched:', orders);
        res.render('order-history', { orders: orders, user: req.user });
    } catch (error) {
        console.error('Error fetching order history:', error);
        res.status(500).json({ error: 'Failed to fetch order history.' });
        next(error);
    }
}

function abandonCart(req, res, next) {
    const userId = parseInt(req.params.user_id, 10);

    if (!Number.isInteger(userId)) {
        return res.status(400).json({ error: 'Invalid user ID.' });
    }

    try {
        const result = cartModel.abandonCart(userId);
        if (result.success) {
            res.status(200).json({ message: 'Cart abandoned successfully.' });
        } else {
            res.status(404).json({ message: 'No active cart found for this user.' });
        }
    } catch (error) {
        console.error('Error abandoning cart:', error);
        res.status(500).json({ error: 'Failed to abandon cart.' });
        next(error);
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    checkout,
    viewCart,
    updateCartItemQuantity,
    getOrderHistory,
    abandonCart,
};
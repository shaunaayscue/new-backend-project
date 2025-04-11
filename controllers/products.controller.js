"use strict";
const model = require("../models/products.model");

function getAllProducts(req, res, next) {
    try {
        res.json(model.getAllProducts());
    } catch (err) {
        console.error("Error while getting games ", err.message);
        next(err);
    }
}

function searchProducts(req, res, next) {
    let attribute = req.query.attribute;
    let value = req.query.value;
    let category_name = req.query.category_name; // Get the category name from query parameters
    try {
        let products;
        
        // If both attribute and value are provided and category_name is provided
        if (attribute && value && category_name) {
            const validColumns = model.getColumnNames();
            if (!validColumns.includes(attribute)) {
                return res.status(400).send("Invalid attribute provided");
            }
            const searchValue = "%" + value + "%";
            products = model.searchByAttributeAndCategory(attribute, searchValue, category_name);
        }
        // If only attribute and value are provided
        else if (attribute && value) {
            const validColumns = model.getColumnNames();
            if (!validColumns.includes(attribute)) {
                return res.status(400).send("Invalid attribute provided");
            }
            const searchValue = "%" + value + "%";
            products = model.getAllByOneAttribute(attribute, searchValue);
        }
        // If only category_name is provided
        else if (category_name) {
            products = model.getProductsByCategory(category_name);
        }
        // If neither attribute nor category_name are provided, fetch all products
        else {
            products = model.getAllProducts();
        }
        
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found matching the criteria." });
        }
        
        res.json(products);
    } catch (err) {
        console.error("Error in searchProducts:", err.message);
        next(err);
    }
}

function getProductById(req, res, next) {
    try {
        res.json(model.getProductById(req.params.product_id));
    } catch (err) {
        console.error("Error while getting games: ", err.message);
        next(err);
    }
}

module.exports = {
    getAllProducts,
    searchProducts,
    getProductById,
};
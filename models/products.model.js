"use strict";
const db = require("./db-conn");

function getBooksByFlag(flag, value) {
    const query = "SELECT * FROM Products WHERE " + flag + " = ? AND is_archived = 0;";
    return db.all(query, [value]);
}

function getAllProducts(sortBy) {
    let sql = "SELECT p.*, c.category_name FROM Products p LEFT JOIN Categories c ON p.category_id = c.category_id WHERE p.is_archived = 0;";
    if (sortBy === 'name-asc') {
        sql += " ORDER BY p.product_name ASC";
    } else if (sortBy === 'name-desc') {
        sql += " ORDER BY p.product_name DESC";
    } else if (sortBy === 'price-asc') {
        sql += " ORDER BY p.price ASC";
    } else if (sortBy === 'price-desc') {
        sql += " ORDER BY p.price DESC";
    }
    const allProducts = db.all(sql);
    const updatedProducts = allProducts.map(product => ({
        ...product,
        image_url: product.image_url.startsWith('/') ? product.image_url : '/' + product.image_url,
        category_name: product.category_name
    }));
    return updatedProducts;
}

function getAllProductsWithCategoryNames() {
    const sql = "SELECT p.*, c.category_name FROM Products p LEFT JOIN Categories c ON p.category_id = c.category_id;";
    const allProducts = db.all(sql);
    const updatedProducts = allProducts.map(product => ({
        ...product,
        image_url: product.image_url.startsWith('/') ? product.image_url : '/' + product.image_url,
        category_name: product.category_name
    }));
    return updatedProducts;
}

function getProductsByCategory(category_name) {
    let sql = "SELECT p.* FROM Products p JOIN Categories c ON p.category_id = c.category_id WHERE LOWER(c.category_name) = LOWER(?) AND p.is_archived = 0;";
    const data = db.all(sql, [category_name]);
    return data;
}

function getAllByOneAttribute(attribute, value) {
    const validColumns = getColumnNames();
    if (validColumns.includes(attribute)) {
        let sql = "SELECT * FROM Products WHERE " + attribute + " LIKE ?;";
        const data = db.all(sql, [value]);
        return data;
    }
}

function searchByAttributeAndCategory(attribute, value, category_name) {
    const validColumns = getColumnNames();
    if (validColumns.includes(attribute)) {
        let sql = "SELECT p.* FROM Products p JOIN Categories c ON p.category_id = c.category_id WHERE " + attribute + " LIKE ? AND c.category_name = ?;";
        const data = db.all(sql, [value, category_name]);
        return data;
    }
}

function getColumnNames() {
    let sql = "PRAGMA table_info(Products);";
    const columns = db.all(sql);
    return columns.map(col => col.name);
}

function getProductById(product_id) {
    let sql = "SELECT p.*, c.category_name FROM Products p LEFT JOIN Categories c ON p.category_id = c.category_id WHERE p.product_id = ?;";
    const item = db.get(sql, [product_id]);
    return item;
}

function getAllCategories() {
    const sql = "SELECT * FROM Categories";
    const categories = db.all(sql);
    return categories;
}

function searchProductsByCategory(categoryName) {
    const sql = "SELECT p.*, c.category_name FROM Products p JOIN Categories c ON p.category_id = c.category_id WHERE LOWER(c.category_name) = LOWER(?);";
    return db.all(sql, [categoryName]);
}

function searchProductsByName(name) {
    const sql = "SELECT p.*, c.category_name FROM Products p LEFT JOIN Categories c ON p.category_id = c.category_id WHERE LOWER(p.product_name) LIKE LOWER('%' || ? || '%') AND p.is_archived = 0;";
    return db.all(sql, [name]);
}

function searchProductsByNameAndCategory(name, categoryName) {
    const sql = "SELECT p.*, c.category_name FROM Products p JOIN Categories c ON p.category_id = c.category_id WHERE LOWER(p.product_name) LIKE LOWER('%' || ? || '%') AND LOWER(c.category_name) = LOWER(?) AND p.is_archived = 0;";
    return db.all(sql, [name, categoryName]);
}

function getAdminProductsByCategory(category_name) {
    const sql = "SELECT p.*, c.category_name FROM Products p JOIN Categories c ON p.category_id = c.category_id WHERE LOWER(c.category_name) = LOWER(?);";
    const data = db.all(sql, [category_name]);
    return data.map(product => ({
        ...product,
        image_url: product.image_url.startsWith('/') ? product.image_url : '/' + product.image_url
    }));
}

module.exports = {
    getAllProducts,
    getProductsByCategory,
    getAllByOneAttribute,
    searchByAttributeAndCategory,
    getColumnNames,
    getProductById,
    getBooksByFlag,
    getAllProductsWithCategoryNames,
    getAllCategories,
    searchProductsByName,
    searchProductsByCategory,
    searchProductsByNameAndCategory,
    getAdminProductsByCategory,
};
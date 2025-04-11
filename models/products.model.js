"use strict";
const db = require("./db-conn");

function getAllProducts() {
    let sql = "SELECT * FROM Products;";
    const data = db.all(sql);
    return data;
}

function getProductsByCategory(category_name) {
    let sql = "SELECT p.* FROM Products p JOIN Categories c ON p.category_id = c.category_id WHERE c.category_name = ?;";
    const data = db.all(sql, category_name);
    return data;
}

function getAllByOneAttribute(attribute, value) {
    const validColumns = getColumnNames();
    if (validColumns.includes(attribute)) {
        let sql = "SELECT * FROM Products WHERE " + attribute + " LIKE ?;";
        const data = db.all(sql, value);
        return data;
    }
}

function searchByAttributeAndCategory(attribute, value, category_name) {
    const validColumns = getColumnNames();
    if (validColumns.includes(attribute)) {
        let sql = "SELECT p.* FROM Products p JOIN Categories c ON p.category_id = c.category_id WHERE " + attribute + " LIKE ? AND c.category_name = ?;";
        const data = db.all(sql, value, category_name);
        return data;
    }
}

function getColumnNames() {
    let sql = "PRAGMA table_info(Products);";
    const columns = db.all(sql);
    return columns.map(col => col.name);
}

function getProductById(product_id) {
    let sql = "SELECT * FROM Products WHERE product_id =? ;";
    const item = db.get(sql, product_id);
    return item;
}

module.exports = {
    getAllProducts,
    getProductsByCategory,
    getAllByOneAttribute,
    searchByAttributeAndCategory,
    getColumnNames,
    getProductById,
};
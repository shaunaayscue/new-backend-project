"use strict";
const db = require("./db-conn");

function getBooksByFlag(flag, value) {
    const query = "SELECT * FROM Products WHERE " + flag + " = ? AND is_archived = 0;";
    return db.all(query, [value]);
}

function getAllProducts(sortBy, categoryName) {
    let sql = "SELECT p.*, c.category_name FROM Products p LEFT JOIN Categories c ON p.category_id = c.category_id WHERE p.is_archived = 0";
    const validSortOptions = ['name-asc', 'name-desc', 'price-asc', 'price-desc'];
    const params = [];

    if (categoryName && categoryName !== 'all') {
        sql += " AND LOWER(c.category_name) = LOWER(?)";
        params.push(categoryName);
    }

    if (sortBy && validSortOptions.includes(sortBy)) {
        if (sortBy === 'name-asc') {
            sql += " ORDER BY p.product_name ASC";
        } else if (sortBy === 'name-desc') {
            sql += " ORDER BY p.product_name DESC";
        } else if (sortBy === 'price-asc') {
            sql += " ORDER BY p.price ASC";
        } else if (sortBy === 'price-desc') {
            sql += " ORDER BY p.price DESC";
        }
    }

    console.log("getAllProducts SQL:", sql, params);
    return db.all(sql, params);
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

function getProductsByCategory(category_name, sortBy) {
    let sql = "SELECT p.*, c.category_name FROM Products p JOIN Categories c ON p.category_id = c.category_id WHERE LOWER(c.category_name) = LOWER(?) AND p.is_archived = 0";
    const validSortOptions = ['name-asc', 'name-desc', 'price-asc', 'price-desc'];

    if (sortBy && validSortOptions.includes(sortBy)) {
        if (sortBy === 'name-asc') {
            sql += " ORDER BY p.product_name ASC";
        } else if (sortBy === 'name-desc') {
            sql += " ORDER BY p.product_name DESC";
        } else if (sortBy === 'price-asc') {
            sql += " ORDER BY p.price ASC";
        } else if (sortBy === 'price-desc') {
            sql += " ORDER BY p.price DESC";
        }
    }

    console.log("getProductsByCategory SQL:", sql, [category_name]);
    return db.all(sql, [category_name]);
}

function getAllByOneAttribute(attribute, value) {
    const validColumns = getColumnNames();
    if (validColumns.includes(attribute)) {
        let sql = "SELECT * FROM Products WHERE " + attribute + " LIKE ?;";
        console.log("getAllByOneAttribute SQL:", sql);
        const data = db.all(sql, [value]);
        return data;
    }
}

function searchByAttributeAndCategory(attribute, value, category_name) {
    const validColumns = getColumnNames();
    if (validColumns.includes(attribute)) {
        let sql = "SELECT p.* FROM Products p JOIN Categories c ON p.category_id = c.category_id WHERE " + attribute + " LIKE ? AND c.category_name = ?;";
        console.log("searchByAttributeAndCategory SQL:", sql);
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

function findGenresByProductName(searchTerm) {
    const sql = `
        SELECT DISTINCT c.category_name
        FROM Products p
        JOIN Categories c ON p.category_id = c.category_id
        WHERE LOWER(p.product_name) LIKE LOWER('%' || ? || '%')
        AND p.is_archived = 0;
    `;
    return db.all(sql, [searchTerm]).then(rows => rows.map(row => row.category_name));
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
    searchProductsByNameAndCategory,
    getAdminProductsByCategory,
    findGenresByProductName,
};
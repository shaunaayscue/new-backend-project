"use strict";
const db = require("./db-conn");

function createNew(params) {
    let sql =
        "INSERT INTO Products " +
        "(product_name, description, image_url, price, isbn, author, category_id, pages, publisher, featured, trending, new_release, is_archived) " +
        "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ";
    const info = db.run(sql, params);
    return info;
}

function deleteProduct(product_id) {
    let sql = "DELETE FROM Products WHERE product_id = ?;";
    try {
        const info = db.run(sql, [product_id]);
        return info;
    } catch (error) {
        console.error("DB error", error);
        throw error;
    }
}

function editProduct(params) {
    let sql =
        "UPDATE Products " +
        "SET product_name = ?, description = ?, image_url = ?, price = ?, isbn = ?, " +
        "author = ?, category_id = ?, pages = ?, publisher = ?, " +
        "featured = ?, trending = ?, new_release = ? " +
        "WHERE product_id = ?;";
    const info = db.run(sql, params);
    return info;
}

function bulkUploadProducts(products) {
    console.log("Received data in model:", products);
    db.exec("BEGIN TRANSACTION");
    try {
        for (const product of products) {
            let sql =
                "INSERT INTO Products (product_name, description, image_url, price, isbn, author, category_id, pages, publisher, featured, trending, new_release, is_archived)" +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
            let params = [
                product.product_name,
                product.description,
                product.image_url,
                product.price,
                product.isbn,
                product.author,
                product.category_id,
                product.pages,
                product.publisher,
                product.featured,
                product.trending,
                product.new_release,
                product.is_archived,
            ];
            db.run(sql, params);
        }
        db.exec("COMMIT");
        return { success: true, message: "Bulk upload successful" };
    } catch (err) {
        db.exec("ROLLBACK");
        console.error("Error during bulk upload:", err.message);
        throw err;
    }
}

function archiveProduct(productId) {
    const sql = "UPDATE products SET is_archived = CASE WHEN is_archived = 1 THEN 0 ELSE 1 END WHERE product_id = ?;";
    console.log("Executing SQL:", sql, "with productId:", productId); 
    try {
        const result = db.run(sql, productId);
        return result;
    } catch (error) {
        console.error("Error archiving/unarchiving product in database:", error);
        throw error;
    }
}

function getActiveProducts(searchTerm = '', category_name = 'all') {
    let sql = "SELECT p.*, c.category_name FROM products p LEFT JOIN categories c ON p.category_id = c.category_id WHERE p.is_archived = 0;";
    const params = [];

    if (searchTerm) {
        sql += " AND (p.product_name LIKE ? OR c.category_name LIKE ?)";
        const wildcardSearchTerm = "%" + searchTerm + "%";
        params.push(wildcardSearchTerm, wildcardSearchTerm);
    }

    if (category_name !== 'all') {
        sql += " AND c.category_name = ?";
        params.push(category_name);
    }

    try {
        const queryResult = db.run(sql, params);
        const rows = queryResult[0];
        return rows;
    } catch (error) {
        console.error("Error fetching active products from database:", error);
        throw error;
    }
}

function getAllProductsForAdmin() {
    const sql = "SELECT p.*, c.category_name FROM Products p LEFT JOIN Categories c ON p.category_id = c.category_id;";
    const allProducts = db.all(sql);
    const updatedProducts = allProducts.map(product => ({
        ...product,
        image_url: product.image_url.startsWith('/') ? product.image_url : '/' + product.image_url,
        category_name: product.category_name
    }));
    return updatedProducts;
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
    createNew,
    deleteProduct,
    editProduct,
    bulkUploadProducts,
    archiveProduct,
    getActiveProducts,
    getAllProductsForAdmin,
    getAdminProductsByCategory,
};
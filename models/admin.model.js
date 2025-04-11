"use strict";
const db = require("./db-conn");

function createNew(params) {
    let sql = "INSERT INTO Products " +
        "(product_name, description, image_url, price, isbn, author, category_id, pages, publisher, featured, trending, new_release) " +
        "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ";
    const info = db.run(sql, params);
    return info;
}

function deleteProduct(product_id) {
    let sql = "DELETE FROM Products WHERE product_id =? ; ";
    const info = db.run(sql, product_id);
    return info;
}

function editProduct(params) {
    let sql = "UPDATE Products " +
        "SET product_name = ?, description = ?, image_url = ?, price = ?, isbn = ?, " +
        "author = ?, category_id = ?, pages = ?, publisher = ?, " +
        "featured = ?, trending = ?, new_release = ? " +
        "WHERE product_id = ?;";
    const info = db.run(sql, params);
    return info;
}

function bulkUploadProducts(products) {
    db.exec("BEGIN TRANSACTION");
    try {
        for (const product of products) {
            let sql = "INSERT INTO Products (product_name, description, image_url, price, isbn, author, category_id, pages, publisher, featured, trending, new_release)" +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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

module.exports = {
    createNew,
    deleteProduct,
    editProduct,
    bulkUploadProducts,
};
"use strict";
const adminModel = require("../models/admin.model");
const model = require("../models/products.model");

function createNew(req, res, next) {
    let product_name = req.body.product_name;
    let description = req.body.description;
    let image_url = req.body.image_url;
    let price = req.body.price;
    let isbn = req.body.isbn;
    let author = req.body.author;
    let category_id = req.body.category_id;
    let pages = req.body.pages;
    let publisher = req.body.publisher;
    let featured = req.body.featured;
    let trending = req.body.trending;
    let new_release = req.body.new_release;
    if (
        product_name && description && image_url && price &&
        isbn && author && category_id && pages && publisher &&
        featured !== undefined && trending !== undefined && new_release !== undefined
    ) {
        let params = [
            product_name,
            description,
            image_url,
            price,
            isbn,
            author,
            category_id,
            pages,
            publisher,
            featured,
            trending,
            new_release
        ];
        try {
            res.json(adminModel.createNew(params));
        } catch (err) {
            console.error("Error while creating product: ", err.message);
            next(err);
        }
    } else {
        res.status(400).send("Invalid Request: Missing one or more required fields");
    }
}

function deleteProduct(req, res, next) {
    try {
        adminModel.deleteProduct(req.params.product_id);
        res.json(model.getAllProducts());
    } catch (err) {
        console.error("Error while getting product: ", err.message);
        next(err);
    }
}

function editProduct(req, res, next) {
    let product_id = req.params.product_id;
    let product_name = req.body.product_name;
    let description = req.body.description;
    let image_url = req.body.image_url;
    let price = req.body.price;
    let isbn = req.body.isbn;
    let author = req.body.author;
    let category_id = req.body.category_id;
    let pages = req.body.pages;
    let publisher = req.body.publisher;
    let featured = req.body.featured;
    let trending = req.body.trending;
    let new_release = req.body.new_release;
    if (
        product_id && product_name && description && image_url && price && isbn &&
        author && category_id && pages && publisher &&
        typeof featured !== "undefined" && typeof trending !== "undefined" && typeof new_release !== "undefined"
    ) {
        let params = [
            product_name,
            description,
            image_url,
            price,
            isbn,
            author,
            category_id,
            pages,
            publisher,
            featured,
            trending,
            new_release,
            product_id
        ];
        try {
            const result = adminModel.editProduct(params);
            res.json(result);
        } catch (err) {
            console.error("Error while editing product: ", err.message);
            next(err);
        }
    } else {
        res.status(400).send("Invalid Request");
    }
}

function bulkUploadProducts(req, res, next) {
    try {
        const products = req.body;
        const result = adminModel.bulkUploadProducts(products);
        res.json({ success: true, result });
    } catch (err) {
        console.error("Error during bulk product upload: ", err.message);
        next(err);
    }
}

module.exports = {
    createNew,
    deleteProduct,
    editProduct,
    bulkUploadProducts,
};
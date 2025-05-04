"use strict";
const model = require("../models/products.model");

function getHomePage(req, res, next) {
    try {
        const featuredBooks = model.getBooksByFlag('featured', 1);
        const newReleases = model.getBooksByFlag('new_release', 1);
        const trendingBooks = model.getBooksByFlag('trending', 1);

        res.render('index', {
            featuredBooks: featuredBooks,
            newReleases: newReleases,
            trendingBooks: trendingBooks,
            title: ' '
        });
    } catch (err) {
        console.error('Error while fetching books: ', err.message);
        next(err);
    }
}

function getAllProducts(req, res, next) {
    const sortBy = req.query.sortBy;
    const category_name = req.query.category_name || 'all'; 
    try {
        const products = model.getAllProducts(sortBy);
        const categories = model.getAllCategories();
        const filteredProducts = category_name === 'all' ? products : products.filter(p => p.category_name === category_name);
        res.render("products", {
            products: filteredProducts.filter(p => p.is_archived === 0), 
            searchResults: [],
            searchPerformed: false,
            title: ' ',
            categories: categories,
            selectedCategory: category_name 
        });
    } catch (err) {
        console.error("Error while getting products ", err.message);
        next(err);
    }
}

function searchProducts(req, res, next) {
    let attribute = req.query.attribute;
    let value = req.query.value;
    let category_name = req.query.category_name;
    const sortBy = req.query.sortBy;

    try {
        let searchResults;
        const categories = model.getAllCategories();

        if (attribute && value && category_name && category_name !== "") {
            const validColumns = model.getColumnNames();
            if (!validColumns.includes(attribute)) {
                return res.status(400).send("Invalid attribute provided");
            }
            const searchValue = "%" + value + "%";
            searchResults = model.searchByAttributeAndCategory(attribute, searchValue, category_name, sortBy);
        }
        else if (attribute && value) {
            const validColumns = model.getColumnNames();
            if (!validColumns.includes(attribute)) {
                return res.status(400).send("Invalid attribute provided");
            }
            const searchValue = "%" + value + "%";
            searchResults = model.getAllByOneAttribute(attribute, searchValue, sortBy);
        }
        else if (category_name && category_name !== "all") {
            searchResults = model.getProductsByCategory(category_name, sortBy);
        }
        else {
            const products = model.getAllProducts(sortBy);
            return res.render("products", {
                products: products.filter(p => p.is_archived === 0),
                searchResults: [],
                searchPerformed: false,
                title: ' ',
                categories: categories,
                selectedCategory: category_name 
            });
        }

        searchResults = searchResults.filter(product => product.is_archived === 0);

        res.render("products", {
            products: [],
            searchResults: searchResults,
            searchPerformed: true,
            categories: categories,
            selectedCategory: category_name 
        });
    } catch (err) {
        console.error("Error in searchProducts:", err.message);
        next(err);
    }
}

function getProductById(req, res, next) {
    const productId = req.params.product_id;
    try {
        const product = model.getProductById(productId);
        if (!product) {
            return res.status(404).send("Product not foun");
        }
        res.render("details", { product });
    } catch (err) {
        console.error("Error while getting games: ", err.message);
        next(err);
    }
}

module.exports = {
    getAllProducts,
    searchProducts,
    getProductById,
    getHomePage,
};
"use strict";
const model = require("../models/products.model");
const adminModel = require("../models/admin.model");

function getHomePage(req, res, next) {
    try {
      req.session.returnTo = req.originalUrl;
      const featuredBooks = model.getBooksByFlag("featured", 1);
      const newReleases = model.getBooksByFlag("new_release", 1);
      const trendingBooks = model.getBooksByFlag("trending", 1);
  
      res.render("index", {
        title: "",
        featuredBooks,
        newReleases,
        trendingBooks,
        user: req.user
      });
    } catch (err) {
      console.error("Error fetching home page data: ", err.message);
      next(err);
    }
}

function getAllProducts(req, res, next) {
    let sortBy = req.query.sortBy;
    let category_name = req.query.category_name || 'all';
    try {
        const products =  model.getAllProducts(sortBy, category_name); 
        const categories =  model.getAllCategories();
        res.render("products", {
            products: products.filter(p => p.is_archived === 0),
            searchResults: [],
            searchPerformed: false,
            title: ' ',
            categories: categories,
            selectedCategory: category_name || 'all',
            sortBy: sortBy || ''
        });
    } catch (err) {
        console.error("Error while getting products ", err.message);
        next(err);
    }
}

function searchProducts(req, res, next) {
    let sortBy = req.query.sortBy;
    let category_name = req.query.category_name;
    let searchTerm = req.query.value;

    try {
        let searchResults = [];
        const categories = model.getAllCategories();
        let searchPerformed = false;

        if (searchTerm) {
            searchPerformed = true;
            const nameResults = model.searchProductsByName(searchTerm, sortBy);
            const categoryResults = adminModel.getAdminProductsByCategory(searchTerm, sortBy);

            searchResults = [...nameResults, ...categoryResults];
        } else if (category_name && category_name !== "all") {
            searchPerformed = true;
            searchResults = model.getProductsByCategory(category_name, sortBy);
        } else {
            const products = model.getAllProducts(sortBy);
            return res.render("products", {
                products: products.filter(p => p.is_archived === 0),
                searchResults: [],
                searchPerformed: false,
                title: ' ',
                categories: categories,
                selectedCategory: category_name || 'all',
                sortBy: sortBy || ''
            });
        }

        searchResults = searchResults.filter(product => product.is_archived === 0);

        res.render("products", {
            products: [],
            searchResults: searchResults,
            searchPerformed: searchPerformed,
            categories: categories,
            selectedCategory: category_name || 'all',
            sortBy: sortBy || ''
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

function getAllProductsPage(req, res, next) {
    const { value: searchTerm, attribute: searchAttribute, sortBy, category_name } = req.query;
    const categories = model.getAllCategories();

    if (searchTerm && searchAttribute) {
        const searchResults = model.searchProducts(searchAttribute, searchTerm);
        res.render("products", {
            products: [],
            searchResults,
            searchPerformed: true,
            categories: categories,
            selectedCategory: category_name || 'all',
            sortBy: sortBy || '' 
        });
    } else {
        const products = model.getAllProducts(sortBy);
        res.render("products", {
            title: "All Products",
            products,
            searchResults: [],
            searchPerformed: false,
            categories: categories,
            selectedCategory: category_name || 'all',
            sortBy: sortBy || '' 
        });
    }
}

async function getGenresBySearch(req, res, next) {
    const searchTerm = req.query.search;

    try {
        const genres = await model.findGenresByProductName(searchTerm); 
        res.json(genres);
    } catch (error) {
        console.error('Error fetching genres by search:', error);
        res.status(500).json({ error: 'Failed to fetch genres' });
    }
}

module.exports = {
    getAllProducts,
    searchProducts,
    getProductById,
    getHomePage,
    getAllProductsPage,
    getGenresBySearch,
};
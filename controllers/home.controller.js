"use strict";
const productModel = require("../models/products.model");

 function getHomePage(req, res, next) {
  try {
    req.session.returnTo = req.originalUrl;
    const featuredBooks = productModel.getBooksByFlag("featured", 1);
    const newReleases = productModel.getBooksByFlag("new_release", 1);
    const trendingBooks = productModel.getBooksByFlag("trending", 1);

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

module.exports = { getHomePage };
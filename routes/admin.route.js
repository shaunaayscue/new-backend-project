"use strict";
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const ensureAuth = require("../auth/auth.middleware");

//http://localhost:3000/admin/products/add
router.post("/products/add", ensureAuth, adminController.createNew);

//http://localhost:3000/admin/products/edit/21
router.put("/products/edit/:product_id", ensureAuth, adminController.editProduct);

//http://localhost:3000/admin/products/delete/21
router.delete("/products/delete/:product_id", ensureAuth, adminController.deleteProduct);

//http://localhost:3000/admin/products/bulk
router.post("/products/bulk", ensureAuth, adminController.bulkUploadProducts);

router.get("/products/list", ensureAuth, adminController.getAllProducts);

router.get('/products/edit/:product_id', ensureAuth, adminController.editProductForm);

module.exports = router;

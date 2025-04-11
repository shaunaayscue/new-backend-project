"use strict";
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

//http://localhost:3000/admin/products/add
router.post("/products/add", adminController.createNew);

//http://localhost:3000/admin/products/edit/21
router.put("/products/edit/:product_id", adminController.editProduct);

//http://localhost:3000/admin/products/delete/21
router.delete("/products/delete/:product_id", adminController.deleteProduct);

//http://localhost:3000/admin/products/bulk
router.post("/products/bulk", adminController.bulkUploadProducts);

module.exports = router;
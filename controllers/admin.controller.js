"use strict";
const adminModel = require("../models/admin.model");
const model = require("../models/products.model");
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = lines.shift().split(',').map(h => h.trim());

  return lines.map(line => {
    const data = line.split(',').map(value => value.trim());
    const obj = {};
    headers.forEach((header, idx) => {
      obj[header] = data[idx];
    });
    return obj;
  });
}

function parseText(content) {
  const lines = content.trim().split('\n');
  const products = [];
  let currentProduct = {};

  for (const line of lines) {
    if (line.trim() === '') {
      if (Object.keys(currentProduct).length > 0) {
        products.push(currentProduct);
        currentProduct = {};
      }
    } else {
      const [key, ...rest] = line.split(':');
      if (key && rest.length > 0) {
        currentProduct[key.trim()] = rest.join(':').trim();
      }
    }
  }

  if (Object.keys(currentProduct).length > 0) {
    products.push(currentProduct);
  }

  return products.map(product => ({
    product_name: product.product_name,
    description: product.description,
    image_url: product.image_url,
    price: parseFloat(product.price),
    isbn: product.isbn,
    author: product.author,
    category_id: parseInt(product.category_id),
    pages: parseInt(product.pages),
    publisher: product.publisher,
    featured: parseInt(product.featured),
    trending: parseInt(product.trending),
    new_release: parseInt(product.new_release),
    is_archived: parseInt(product.is_archived)
  }));
}

function searchProducts(req, res, next) {
  const { category_name, value: searchTerm, attribute: searchAttribute } = req.query;

  try {
    let searchResults = [];

    if (category_name && category_name !== "all") {
      if (searchTerm && searchAttribute) {
        searchResults = model.searchProductsByNameAndCategory(searchTerm, category_name);
      } else {
        searchResults = model.getAdminProductsByCategory(category_name);
      }
    } else {
      if (searchTerm && searchAttribute) {
        searchResults = model.searchProductsByName(searchTerm);
      } else {
        searchResults = model.getAllProductsWithCategoryNames();
      }
    }

    const categories = model.getAllCategories();
    res.render("admin-products", {
      products: searchResults,
      searchTerm: searchTerm,
      searchPerformed: true,
      selectedCategory: category_name || "all",
      categories
    });
  } catch (err) {
    console.error("Error in searchProducts:", err.message);
    next(err);
  }
}

function getProductById(req, res, next) {
  try {
    const product_id = req.params.product_id;
    const product = model.getProductById(product_id);
    const categories = model.getAllCategories();
    res.render("product-edit", { product, categories });
  } catch (error) {
    console.error("Error while getting product: ", error.message);
    next(error);
  }
}

function createNew(req, res, next) {
  const {
    product_name, description, image_url, price, isbn, author,
    category_id, pages, publisher, featured, trending, new_release, is_archived
  } = req.body;

  if (product_name && description && image_url && price && isbn && author && category_id && pages && publisher) {
    try {
      const params = [
        product_name, description, image_url,
        Number(price), isbn, author,
        Number(category_id), Number(pages), publisher,
        featured === "1" ? 1 : 0,
        trending === "1" ? 1 : 0,
        new_release === "1" ? 1 : 0,
        is_archived === "1" ? 1 : 0
      ];
      adminModel.createNew(params);
      const products = model.getAllProductsWithCategoryNames();
      const categories = model.getAllCategories();
      res.render("admin-products", { products, categories, searchTerm: '' });
    } catch (err) {
      console.error("Error while creating product: ", err.message);
      next(err);
    }
  } else {
    res.status(400).send("Invalid Request: Missing required fields");
  }
}

function deleteProduct(req, res, next) {
  try {
    const productId = req.params.product_id;
    adminModel.deleteProduct(productId);
    const products = adminModel.getAllProductsForAdmin(); 
        const categories = model.getAllCategories()
        res.render("admin-products", { products: products, categories: categories, searchTerm: '' });
  } catch (err) {
    console.error("Error while deleting product: ", err.message);
    next(err);
  }
}

function editProduct(req, res, next) {
  const {
    product_name, description, image_url, price, isbn, author,
    category_id, pages, publisher, featured = "0", trending = "0", new_release = "0",
    is_archived = "0"
  } = req.body;
  const product_id = req.params.product_id;

  if (product_name && description && image_url && price && isbn && author && category_id && pages && publisher) {
    try {
      const params = [
        product_name, description, image_url,
        Number(price), isbn, author,
        Number(category_id), Number(pages), publisher,
        featured === "1" ? 1 : 0,
        trending === "1" ? 1 : 0,
        new_release === "1" ? 1 : 0,
        is_archived === "1" ? 1 : 0,
        product_id
      ];
      adminModel.editProduct(params);
      const products = model.getAllProductsWithCategoryNames();
      const categories = model.getAllCategories();
      res.render("admin-products", { products, categories, searchTerm: '' });
    } catch (err) {
      console.error("Error while editing product: ", err.message);
      next(err);
    }
  } else {
    res.status(400).send("Invalid Request: Missing required fields");
  }
}

const bulkUploadProducts = [
  upload.single('product-file'),

  (req, res, next) => {
    if (!req.file) {
      return res.status(400).send('Please upload a file.');
    }

    const filePath = req.file.path;
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    let productsData = [];

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      switch (fileExtension) {
        case '.json':
          productsData = JSON.parse(fileContent);
          break;
        case '.csv':
          productsData = parseCSV(fileContent);
          break;
        case '.txt':
          productsData = parseText(fileContent);
          break;
        default:
          return res.status(400).send('Unsupported file format.');
      }

      if (!Array.isArray(productsData)) {
        return res.status(400).send('File must contain an array of products.');
      }

      for (const product of productsData) {
        if (!product.product_name || !product.description || !product.image_url ||
          product.price === undefined || product.isbn === undefined || !product.author ||
          product.category_id === undefined || product.pages === undefined || !product.publisher ||
          product.featured === undefined || product.trending === undefined || product.new_release === undefined) {
          return res.status(400).send('Each product must have all required fields.');
        }
        product.price = parseFloat(product.price);
        product.pages = parseInt(product.pages);
        product.category_id = parseInt(product.category_id);
        product.featured = parseInt(product.featured);
        product.trending = parseInt(product.trending);
        product.new_release = parseInt(product.new_release);
        product.is_archived = parseInt(product.is_archived);
      }

      adminModel.bulkUploadProducts(productsData);

      fs.unlinkSync(filePath);
      res.redirect('/admin/products/list');
    } catch (error) {
      console.error('Error processing uploaded file:', error);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      next(error);
    }
  }
];

function getAllProducts(req, res, next) {
  const categoryName = req.query.category_name || 'all';
  const searchTerm = req.query.searchTerm || '';
  try {
    let products = adminModel.getAllProductsForAdmin();

    console.log("Products before filtering:", products);

    if (searchTerm) {
      const trimmedSearchTerm = searchTerm.toLowerCase().trim();
      products = products.filter(product =>
        product.product_name.toLowerCase().trim().includes(trimmedSearchTerm) ||
        product.category_name.toLowerCase().trim().includes(trimmedSearchTerm)
      );
    }

    if (categoryName !== 'all') {
      products = products.filter(product =>
        product.category_name === categoryName
      );
    }

    const categories = model.getAllCategories();
    console.log("Products being rendered:", products);
    res.render("admin-products", { products, categories, searchTerm: searchTerm, selectedCategory: categoryName, user: req.user });
  } catch (err) {
    console.error("Error fetching admin products:", err.message);
    next(err);
  }
}

function editProductForm(req, res, next) {
  try {
    const product_id = req.params.product_id;
    const product = model.getProductById(product_id);
    const categories = model.getAllCategories();
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.render("product-edit", { product, categories, user: req.user });
  } catch (error) {
    console.error("Error fetching product for edit:", error.message);
    next(error);
  }
}

function archiveProduct(req, res, next) {
  const productId = req.params.product_id;
  console.log("--- Archive Attempt ---");
  console.log("Product ID to archive:", productId);
  console.log("Request Parameters:", req.params);
  console.log("Request Body:", req.body);
  try {
    adminModel.archiveProduct(productId);
    res.redirect("/admin/products/list");
  } catch (error) {
    console.error("Error archiving product:", error);
    next(error);
  }
}

module.exports = {
  parseCSV,
  parseText,
  getAllProducts,
  searchProducts,
  getProductById,
  createNew,
  deleteProduct,
  editProduct, 
  bulkUploadProducts,
  editProductForm,
  archiveProduct,
};

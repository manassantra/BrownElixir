const express = require('express');
const router = express.Router();
const upload = require('../middlewares/fileUploader');
const { createProduct } = require('../controllers/products/productController');

// create new product
// Accept single file with field name "image"
router.post('/create', upload.single('image'), createProduct);

module.exports = router;

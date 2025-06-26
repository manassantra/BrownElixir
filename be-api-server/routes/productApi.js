const express = require('express'),
      router = express.Router(),
      upload = require('../middlewares/fileUploader'),
      accessCheck = require('../middlewares/verifyAdminAccess'),
      productController = require('../controllers/products/productController');

// Create new product (with image)
router.post('/create', accessCheck.verifyAdminAccess, upload.single('image'), productController.createProduct);

// Get all products (with search, filter, pagination)
router.get('/list', productController.getAllProducts);

// Get a single product by ID
router.get('/:id', productController.getProductById);

// Update a product by ID (with optional image)
router.put('/update/:id', accessCheck.verifyAdminAccess, upload.single('image'), productController.updateProduct);

// Delete a product by ID
router.delete('/delete/:id', accessCheck.verifyAdminAccess, productController.deleteProduct);

module.exports = router;

const express = require('express'),
      router = express.Router(),
      upload = require('../middlewares/fileUploader'),
      accessCheck = require('../middlewares/verifyAdminAccess'),
      {
        createProduct,
        getAllProducts,
        getProductById,
        updateProduct,
        deleteProduct
      } = require('../controllers/products/productController');

// ✅ Create new product (with image)
router.post('/create', accessCheck.verifyAdminAccess, upload.single('image'), createProduct);

// ✅ Get all products (with search, filter, pagination)
router.get('/list', getAllProducts);

// ✅ Get a single product by ID
router.get('/:id', getProductById);

// ✅ Update a product by ID (with optional image)
router.put('/update/:id', accessCheck.verifyAdminAccess, upload.single('image'), updateProduct);

// ✅ Delete a product by ID
router.delete('/delete/:id', accessCheck.verifyAdminAccess, deleteProduct);

module.exports = router;

const express = require('express'),
      router = express.Router(),
      upload = require('../middlewares/fileUploader'),
      accessCheck = require('../middlewares/verifyAdminAccess'),
      productCategoryController = require('../controllers/products/productCategoryContoller');

// Create new product category
router.post('/create', accessCheck.verifyAdminAccess, upload.single('image'), productCategoryController.createProductCategory);

// Get all product categories
router.get('/list', productCategoryController.getProductCategories);

// Get a single product category by ID
router.get('/:id', accessCheck.verifyAdminAccess, productCategoryController.getProductCategoryById);

// Update a product category by ID
router.put('/update/:id', accessCheck.verifyAdminAccess, upload.single('image'), productCategoryController.updateProductCategory);

// Delete a product category by ID
router.delete('/delete/:id', accessCheck.verifyAdminAccess, productCategoryController.deleteProductCategory);


module.exports = router;
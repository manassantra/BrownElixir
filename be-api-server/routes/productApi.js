const express = require('express'),
      router = express.Router(),
      upload = require('../middlewares/fileUploader'),
      accessCheck = require('../middlewares/verifyAdminAccess'),
      productController = require('../controllers/products/productController');


/**
 * @swagger
 * /api/product/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Product Controller]
 *     security:
 *       - bearerAuth: []
 *         ApiKeyAuth: []
 *         ApiSecretAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - productCode
 *               - productBrand
 *               - categoryName
 *               - flavor
 *               - description
 *               - ingredients
 *               - unitPrice
 *               - unitWeight
 *               - image
 *               - inStock
 *               - stock
 *             properties:
 *               productName:
 *                 type: string
 *               productCode:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 6
 *               productBrand:
 *                 type: string
 *               categoryName:
 *                 type: string
 *               flavor:
 *                 type: string
 *               description:
 *                 type: string
 *               ingredients:
 *                 type: string
 *               unitPrice:
 *                 type: number
 *               unitWeight:
 *                 type: number
 *               minQty:
 *                 type: number
 *                 default: 1
 *               maxQty:
 *                 type: number
 *                 default: 10
 *               inStock:
 *                 type: boolean
 *               stock:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
// Create new product (with image)
router.post('/create', accessCheck.verifyAdminAccess, upload.single('image'), productController.createProduct);


/**
 * @swagger
 * /api/product/list:
 *   get:
 *     summary: Get all products with search, filters and pagination
 *     tags: [Product Controller]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by product name or brand
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 10
 *     responses:
 *       200:
 *         description: Product list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                 page:
 *                   type: number
 *                 limit:
 *                   type: number
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
// Get all products (with search, filter, pagination)
router.get('/list', productController.getAllProducts);


/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get product details by ID
 *     tags: [Product Controller]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
// Get a single product by ID
router.get('/:id', productController.getProductById);


/**
 * @swagger
 * /api/product/update/{id}:
 *   put:
 *     summary: Update product details
 *     tags: [Product Controller]
 *     security:
 *       - bearerAuth: []
 *         ApiKeyAuth: []
 *         ApiSecretAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               productBrand:
 *                 type: string
 *               categoryName:
 *                 type: string
 *               flavor:
 *                 type: string
 *               description:
 *                 type: string
 *               ingredients:
 *                 type: string
 *               unitPrice:
 *                 type: number
 *               unitWeight:
 *                 type: number
 *               minQty:
 *                 type: number
 *               maxQty:
 *                 type: number
 *               inStock:
 *                 type: boolean
 *               stock:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
// Update a product by ID (with optional image)
router.put('/update/:id', accessCheck.verifyAdminAccess, upload.single('image'), productController.updateProduct);


/**
 * @swagger
 * /api/product/delete/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Product Controller]
 *     security:
 *       - bearerAuth: []
 *         ApiKeyAuth: []
 *         ApiSecretAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
// Delete a product by ID
router.delete('/delete/:id', accessCheck.verifyAdminAccess, productController.deleteProduct);

module.exports = router;

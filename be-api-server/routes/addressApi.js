const express = require("express"),
      addressApi = express(),
      accessCheck = require('../middlewares/verifyCustomerAccess'),
      addressController = require('../controllers/address/addressController');
      

/**
 * @swagger
 * /api/address/create:
 *   post:
 *     summary: Create new address
 *     tags: [Address Controller]
 *     security:
 *       - bearerAuth: []
 *       - ApiKeyAuth: []
 *       - ApiSecretAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Address created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
// create new address
addressApi.post("/create", accessCheck.verifyCustomerAccess, addressController.createAddress);


/**
 * @swagger
 * /api/address/list/{id}:
 *   get:
 *     summary: Get all addresses of a customer
 *     tags: [Address Controller]
 *     security:
 *       - bearerAuth: []
 *       - ApiKeyAuth: []
 *       - ApiSecretAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: List of addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 *       401:
 *         description: Unauthorized
 */
// get list off all address by customer-id
addressApi.get("/list/:id", accessCheck.verifyCustomerAccess, addressController.getCustomerAddresses);


/**
 * @swagger
 * /api/address/{id}:
 *   get:
 *     summary: Get address details by address ID
 *     tags: [Address Controller]
 *     security:
 *       - bearerAuth: []
 *       - ApiKeyAuth: []
 *       - ApiSecretAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Address ID
 *     responses:
 *       200:
 *         description: Address details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       404:
 *         description: Address not found
 */
// get addressDetails by id
addressApi.get("/:id", accessCheck.verifyCustomerAccess, addressController.getAddressById);


/**
 * @swagger
 * /api/address/update/{id}:
 *   put:
 *     summary: Update address details
 *     tags: [Address Controller]
 *     security:
 *       - bearerAuth: []
 *       - ApiKeyAuth: []
 *       - ApiSecretAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Address ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: Address updated successfully
 *       404:
 *         description: Address not found
 */
// update address details
addressApi.put("/update/:id", accessCheck.verifyCustomerAccess, addressController.updateAddress);


/**
 * @swagger
 * /api/address/delete/{id}:
 *   delete:
 *     summary: Delete address
 *     tags: [Address Controller]
 *     security:
 *       - bearerAuth: []
 *       - ApiKeyAuth: []
 *       - ApiSecretAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Address ID
 *     responses:
 *       200:
 *         description: Address deleted successfully
 *       404:
 *         description: Address not found
 */
// delete address
addressApi.delete("/delete/:id", accessCheck.verifyCustomerAccess, addressController.deleteAddress);


module.exports = addressApi
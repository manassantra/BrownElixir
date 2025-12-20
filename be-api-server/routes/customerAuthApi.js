const express = require("express"),
      router = express.Router(),
      customerRegistration = require("../controllers/customer/customerRegistration"),
      customerSignin = require("../controllers/customer/customerSignin");


/**
 * @swagger
 * /api/customer/auth/register:
 *   post:
 *     summary: Register a new customer
 *     tags: [Customer Authentication Controller]
 *     security:
 *       - ApiKeyAuth: []
 *       - ApiSecretAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Customer registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Customer already exists
 */
// create new user
router.post("/register", customerRegistration.createCustomer);


/**
 * @swagger
 * /api/customer/auth/signin:
 *   post:
 *     summary: Customer login
 *     tags: [Customer Authentication Controller]
 *     security:
 *       - ApiKeyAuth: []
 *       - ApiSecretAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "manassantra.contact@gmail.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: Invalid email or password
 */
// signin user
router.post("/signin", customerSignin.customerLoginSession);


module.exports = router;
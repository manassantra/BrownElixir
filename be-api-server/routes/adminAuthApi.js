const express = require("express"),
      router = express.Router(),
      adminUserController = require("../controllers/admin/adminUserRegistration"),
      adminUserSignin = require("../controllers/admin/adminUserSignin");


/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: Register a new admin user
 *     tags: [Admin Authentication Controller]
 *     security:
 *       - ApiKeyAuth: []
 *         ApiSecretAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminUser'
 *     responses:
 *       201:
 *         description: Admin user registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminUser'
 *       400:
 *         description: Validation error
 *       409:
 *         description: Admin user already exists
 */
// create new user
router.post("/register", adminUserController.adminUserRegistration);


/**
 * @swagger
 * /api/admin/signin:
 *   post:
 *     summary: Admin user login
 *     tags: [Admin Authentication Controller]
 *     security:
 *       - ApiKeyAuth: []
 *         ApiSecretAuth: []
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
router.post("/signin", adminUserSignin.adminUserSession);


module.exports = router;
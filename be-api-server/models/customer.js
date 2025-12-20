const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - customerName
 *         - email
 *         - mob
 *         - gender
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           example: "cust_12345"
 *         customerName:
 *           type: string
 *           example: "Manas Santra"
 *         email:
 *           type: string
 *           format: email
 *           example: "manas@gmail.com"
 *         mob:
 *           type: number
 *           example: 9876543210
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           example: male
 *         password:
 *           type: string
 *           format: password
 *           example: "StrongPassword@123"
 *         isPremium:
 *           type: boolean
 *           example: false
 *         isActive:
 *           type: boolean
 *           example: true
 */

const CustomerSchema = mongoose.Schema({
  id: {type: String},
  customerName: {type: String, required: true},
  email: {type: String, required: true},
  mob: {type: Number, required: true},
  gender: {type: String, enum:['male', 'female', 'other'], requiredd: true},
  password: {type: String, required: true},
  isPremium: {type: Boolean},
  isActive: {type: Boolean}
})

module.exports = mongoose.model('Customers', CustomerSchema);
const mongoose = require('mongoose');


/**
 * @swagger
 * components:
 *   schemas:
 *     AdminUser:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - mob
 *         - password
 *       properties:
 *         fullName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         mob:
 *           type: number
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *         password:
 *           type: string
 *           format: password
 *           example: "StrongAdmin@123"
 */

const AdminSchema = mongoose.Schema({
  id: {type: String},
  fullName: {type: String, required : true},
  email: {type: String, required : true},
  mob: {type: Number, required : true},
  gender: {type: String},
  password: {type: String}
})

module.exports = mongoose.model('AdminUser', AdminSchema);
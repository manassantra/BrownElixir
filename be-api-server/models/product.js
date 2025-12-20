const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - productName
 *         - productCode
 *         - productBrand
 *         - categoryName
 *         - flavor
 *         - description
 *         - ingredients
 *         - unitPrice
 *         - unitWeight
 *         - imgUrl
 *         - inStock
 *         - stock
 *       properties:
 *         id:
 *           type: string
 *         productName:
 *           type: string
 *           example: "Chocolate Whey Protein"
 *         productCode:
 *           type: string
 *           example: "BW1234"
 *         productBrand:
 *           type: string
 *           example: "BrownElixir"
 *         categoryName:
 *           type: string
 *           example: "Protein Supplement"
 *         flavor:
 *           type: string
 *           example: "Chocolate"
 *         description:
 *           type: string
 *           example: "High quality whey protein for muscle growth"
 *         ingredients:
 *           type: string
 *           example: "Whey protein isolate, cocoa powder"
 *         unitPrice:
 *           type: number
 *           format: double
 *           example: 2499
 *         unitWeight:
 *           type: number
 *           example: 1
 *         minQty:
 *           type: number
 *           default: 1
 *           example: 1
 *         maxQty:
 *           type: number
 *           default: 10
 *           example: 5
 *         imgUrl:
 *           type: string
 *           format: uri
 *           example: "https://chocobitez-api-server.onrender.com/public/1750794444640-204454487.jpeg"
 *         inStock:
 *           type: boolean
 *           example: true
 *         stock:
 *           type: number
 *           example: 120
 *         isApproved:
 *           type: boolean
 *           example: true
 *         createdDate:
 *           type: string
 *           format: date-time
 *           example: "2025-01-10T12:00:00Z"
 *         createdBy:
 *           type: string
 *           example: "admin_001"
 */

const ProductSchema = mongoose.Schema({
  id: {type: String},
  productName: {type: String, required: true},
  productCode: {type: String, length: 6, required: true},
  productBrand: {type: String, required: true},
  categoryName: {type: String, required: true},
  flavor: {type: String, requiredd: true},
  description: {type: String, required: true},
  ingredients: {type: String, required: true},
  unitPrice: {type: Number, required: true},
  unitWeight: {type: Number, required: true},
  minQty: {type: Number, default: 1},
  maxQty: {type: Number, default: 10},
  imgUrl: {type: String, required: true},
  inStock: {type: Boolean, required: true},
  stock: {type: Number, required: true},
  isApproved: {type: Boolean},
  createdDate: {type: Date},
  createdBy: {type: String}
})

module.exports = mongoose.model('Products', ProductSchema);
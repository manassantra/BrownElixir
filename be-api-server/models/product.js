const mongoose = require('mongoose');

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
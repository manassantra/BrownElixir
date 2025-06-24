const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  id: {type: String},
  productName: {type: String, require: true},
  productCode: {type: String, length: 6, require: true},
  productBrand: {type: String, require: true},
  categoryName: {type: String, require: true},
  flavor: {type: String, required: true},
  description: {type: String, require: true},
  ingredients: {type: String, require: true},
  unitPrice: {type: Number, require: true},
  unitWeight: {type: Number, require: true},
  minQty: {type: Number, default: 1},
  maxQty: {type: Number, default: 10},
  imgUrl: {type: String, require: true},
  inStock: {type: Boolean, require: true},
  stock: {type: Number, require: true},
  isApproved: {type: Boolean},
  createdDate: {type: Date},
  createdBy: {type: String}
})

module.exports = mongoose.model('Products', ProductSchema);
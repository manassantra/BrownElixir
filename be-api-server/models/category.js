const mongoose = require('mongoose');

const ProductCategorySchema = mongoose.Schema({
  id: {type: String},
  categoryName: {type: String, required: true},
  description: {type: String, required: true},
  isApproved: {type: Boolean},
  createdDate: {type: Date},
  createdBy: {type: String}
})

module.exports = mongoose.model('ProductCategory', ProductCategorySchema);
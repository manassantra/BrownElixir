const mongoose = require('mongoose');

const ProductCategorySchema = mongoose.Schema({
  id: {type: String},
  categoryName: {type: String, required : true},
  isApproved: {type: String},
  createdDate: {type: Date},
  createdBy: {type: String}
})

module.exports = mongoose.model('ProductCategory', ProductCategorySchema);
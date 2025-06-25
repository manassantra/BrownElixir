const mongoose = require('mongoose');

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
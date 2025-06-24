const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
  id: {type: String},
  fullName: {type: String, required : true},
  email: {type: String, required : true},
  mob: {type: Number, required : true},
  gender: {type: String},
  password: {type: String}
})

module.exports = mongoose.model('AdminUser', AdminSchema);
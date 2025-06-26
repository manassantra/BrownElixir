const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  id: { type: String, unique: true},
  customerId: { type: String, required: true },
  houseInfo: String,
  flatInfo: String,
  addressLine1: { type: String, required: true },
  addressLine1: { type: String },
  cityOrTown: { type: String, required: true },
  state: { type: String, required: true},
  country: { type: String, required: true},
  pincode: { type: String, required: true},
  addresstype: { type: String, enum:[ 'home', 'work', 'others'], default: 'home'},
});

module.exports = mongoose.model('Addresses', AddressSchema);
const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  id: { type: String},
  customerId: { type: String, required: true },
  houseInfo: {type: String},
  flatInfo: {type: String},
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  cityOrTown: { type: String, required: true },
  state: { type: String, required: true},
  country: { type: String, required: true},
  pincode: { type: String, required: true},
  isDefault: {type: Boolean}
});

module.exports = mongoose.model('Addresses', AddressSchema);
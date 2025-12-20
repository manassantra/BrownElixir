const mongoose = require('mongoose');


/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - customerId
 *         - addressLine1
 *         - cityOrTown
 *         - state
 *         - country
 *         - pincode
 *       properties:
 *         id:
 *           type: string
 *         customerId:
 *           type: string
 *           example: "4cdd49e724ffd95a731d26c54bde70ab"
 *         houseInfo:
 *           type: string
 *           example: "House No 12"
 *         flatInfo:
 *           type: string
 *           example: "Flat B, 2nd Floor"
 *         addressLine1:
 *           type: string
 *           example: "16ft Road, Hanapara"
 *         addressLine2:
 *           type: string
 *           example: "Near XYZ School"
 *         cityOrTown:
 *           type: string
 *           example: "Kolkata"
 *         state:
 *           type: string
 *           example: "West Bengal"
 *         country:
 *           type: string
 *           example: "India"
 *         pincode:
 *           type: string
 *           example: "700102"
 *         isDefault:
 *           type: boolean
 *           example: true
 */
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
const express = require("express"),
      addressApi = express(),
      accessCheck = require('../middlewares/verifyCustomerAccess'),
      addressController = require('../controllers/address/addressController');

// create new address
addressApi.post("/create", accessCheck.verifyCustomerAccess, addressController.createAddress);

// get list off all address by customer-id
addressApi.get("/list/:id", accessCheck.verifyCustomerAccess, addressController.getCustomerAddresses);

// get addressDetails by id
addressApi.get("/:id", accessCheck.verifyCustomerAccess, addressController.getAddressById);

// update address details
addressApi.put("/update/:id", accessCheck.verifyCustomerAccess, addressController.updateAddress);

// delete address
addressApi.delete("/delete/:id", accessCheck.verifyCustomerAccess, addressController.deleteAddress);


module.exports = addressApi
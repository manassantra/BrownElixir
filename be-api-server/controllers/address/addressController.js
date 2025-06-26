const Address = require('../../models/address');
const crypto = require('crypto');

// Create new address
const createAddress = async(req, res) => {
  try {
    const {
      customerId, houseInfo, flatInfo, addressLine1,
      cityOrTown, state, country, pincode, addresstype
    } = req.body;

    if (!customerId || !addressLine1 || !cityOrTown || !state || !country || !pincode) {
      return res.status(400).send({
        status: "Error",
        message: "Missing required address fields."
      });
    }

    const newAddress = new Address({
      id: crypto.randomBytes(16).toString("hex"),
      customerId,
      houseInfo,
      flatInfo,
      addressLine1,
      cityOrTown,
      state,
      country,
      pincode,
      addresstype
    });

    await newAddress.save();

    return res.status(201).send({
      status: "Success",
      message: "Address created successfully."
    });
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      message: "Server error. " + error.message
    });
  }
};

// Get all addresses for a customer
const getCustomerAddresses = async(req, res) => {
  try {
    const customerId = req.params.id;
    const addresses = await Address.find({ customerId });

    if (!addresses) {
        return res.status(404).send({
            status: "Warning",
            message: "No data found!"
        });
    }

    return res.status(200).send({
      status: "Success",
      data: addresses
    });
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      message: "Failed to fetch addresses."
    });
  }
};

// Get a single address by address id
const getAddressById = async(req, res) => {
  try {
    const id = req.params.id;
    const address = await Address.findOne({ id });

    if (!address) {
      return res.status(404).send({
        status: "Error",
        message: "Address not found."
      });
    }

    return res.status(200).send({
      status: "Success",
      data: address
    });
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      message: "Server error."
    });
  }
};

// Update an address by id
const updateAddress = async(req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const updated = await Address.findOneAndUpdate({ id }, updateData, { new: true });

    if (!updated) {
      return res.status(404).send({
        status: "Error",
        message: "Address not found."
      });
    }

    return res.status(200).send({
      status: "Success",
      message: "Address updated successfully.",
      data: updated
    });
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      message: "Failed to update. " + error.message
    });
  }
};

// Delete an address by id
const deleteAddress = async(req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Address.findOneAndDelete({ id });

    if (!deleted) {
      return res.status(404).send({
        status: "Error",
        message: "Address not found."
      });
    }

    return res.status(200).send({
      status: "Success",
      message: "Address deleted successfully."
    });
  } catch (error) {
    return res.status(500).send({
      status: "Error",
      message: "Failed to delete address."
    });
  }
};

module.exports = {
  createAddress,
  getCustomerAddresses,
  getAddressById,
  updateAddress,
  deleteAddress
};

const Customer = require('../../models/customer');


const getAllCustomersList = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).send({
      status: "Success",
      data: customers
    });
  } catch (err) {
    res.status(500).send({
      status: "Error",
      message: "Error fetching customers"
    });
  }
};

const getCustomerDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findOne({ id });
    if (!customer) {
      return res.status(404).send({
        status: "Warning",
        message: "Customer not found"
      });
    }
    res.status(200).send({
      status: "Success",
      data: customer
    });
  } catch (err) {
    res.status(500).send({
      status: "Error",
      message: "Error retrieving customer"
    });
  }
};

const updateCustomerContactInfo = async (req, res) => {
  const { id } = req.params;
  const { email, mob } = req.body;

  if (!email && !mob) {
    return res.status(400).send({
      status: "Warning",
      message: "No email or mobile number provided to update"
    });
  }

  const updateFields = {};
  if (email) updateFields.email = email;
  if (mob) updateFields.mob = mob;

  try {
    const customer = await Customer.findOneAndUpdate(
      { id },
      updateFields,
      { new: true }
    );

    if (!customer) {
      return res.status(404).send({
        status: "Warning",
        message: "Customer not found"
      });
    }

    res.status(200).send({
      status: "Success",
      message: "Customer contact info updated",
      data: customer
    });
  } catch (err) {
    res.status(500).send({
      status: "Error",
      message: "Error updating customer contact info"
    });
  }
};

const deleteCustomerProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await Customer.findOneAndDelete({ id });
    if (!customer) {
      return res.status(404).send({
        status: "Warning",
        message: "Customer not found"
      });
    }

    res.status(200).send({
      status: "Success",
      message: "Customer deleted successfully",
      data: customer
    });
  } catch (err) {
    res.status(500).send({
      status: "Error",
      message: "Error deleting customer"
    });
  }
};


module.exports = {
    getAllCustomersList,
    getCustomerDetails,
    updateCustomerContactInfo,
    deleteCustomerProfile
}
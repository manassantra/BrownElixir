const Razorpay = require('razorpay'),
      Customer = require('../models/customer');


// Create Razorpay order
const orderPayment = async(customerId, totalAmount) => {

  // Razorpay instance
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });

  const customer = await Customer.findOne({id: customerId});

  const options = {
    amount: totalAmount*100, // ₹500 in paise
    currency: "INR",
    receipt: `ORDBE_${Date.now().toLocaleString()}`,
    notes: {
      customerName: customer.customerName,
      purpose: "BrownElixir Order"
    }
  };


  try {
    const order = await razorpay.orders.create(options);
    res.status(200).send({
      status: "SUCCESS",
      data: order
    });
  } catch (err) {
    res.status(500).send({
      status: "ERROR",
      message: "Failed to create order"
    });
  }

  }

module.exports = {
  orderPayment
};
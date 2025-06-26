const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: String,
  customerId: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      productName: { type: String, required: true },
      imgUrl: String,
      qty: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      totalPrice: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number },
  deliveryAddressId: { type: String, required: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    required: true
  },
  paymentMethod: { type: String, enum: ['cod', 'online']},
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']
  },
  taxAmount: Number,
  deliveryCharges: Number,
  orderCreationDate: Date,
  shippingDate: Date,
  deliveredDate: Date,
  cancelledDate: Date,
});

module.exports = mongoose.model('Orders', OrderSchema);

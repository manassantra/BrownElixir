const Order = require('../../models/order'),
      updateProductStock = require('../../services/updateStocks'),
      orderPayment = require('../../services/paymentService');


// Create Order Controller
const generateOrder = async (req, res) => {
  const {
    customerId,
    items,
    deliveryAddressId,
    paymentMethod
  } = req.body;

// Calculate totals
    let totalAmount = 0;
    let order;
    const updatedItems = items.map(item => {
      const totalPrice = item.qty * item.unitPrice;
      totalAmount += totalPrice;
      return { ...item, totalPrice };
    });

    if (paymentMethod === 'cod') {
        order = createOrder(customerId, items, totalAmount, deliveryAddressId, 'pending', 'cod');
    } else if (paymentMethod === 'online') {
        const paymentInfo = orderPayment(customerId, totalAmount);
        if (paymentInfo.status === 'SUCCESS') {
            order = createOrder(customerId, items, totalAmount, deliveryAddressId, 'paid', 'online');
        } else {
           order = createOrder(customerId, items, totalAmount, deliveryAddressId, 'failed', 'cod'); 
        }
    }

    try {
        const data = await order.save();
        if (data) {
            updateProductStock(items);
            res.status(200).send({status:'Success', message: 'Order Placed Successfully!'})
        } else {
            res.status(500).send({status:'Error', message: 'Error in server. Try again!'});
        }
    } catch(err) {
        res.status(500).send({status:'Error', message: err.message});
    }
};

async function createOrder(customerId, items, totalAmount, deliveryAddressId, paymentStatus, paymentMethod) {

    // calculate dates
    const orderCreationDate = new Date();
    const shippingDate = new Date(orderCreationDate);
    shippingDate.setDate(orderCreationDate.getDate() + 4);

    const taxAmount = totalAmount % 7;
    const deliveryCharges = 30;
    totalAmount = totalAmount + taxAmount;

    const newOrder = new Order({
        orderId: `ORDBE_${Date.now().toLocaleString()}`,
        customerId,
        items,
        totalAmount,
        deliveryAddressId,
        paymentStatus,
        paymentMethod,
        orderStatus: 'confirmed',
        taxAmount,
        deliveryCharges,
        orderCreationDate: Date.now(),
        shippingDate
    });

    return newOrder;
}


module.exports = { generateOrder };

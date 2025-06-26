const Order = require('../../models/order'),
      updateProductStock = require('../../services/updateStocks');


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
    items.map(item => {
      const totalPrice = item.qty * item.unitPrice;
      totalAmount += totalPrice;
    });

    order = await calculateAmountAndTaxes(items, totalAmount);
    try {
        const body = new Order({
          orderId: order.orderId,
          customerId,
          items,
          totalAmount: order.totalAmount,
          deliveryAddressId,
          paymentStatus: 'pending',
          paymentMethod: 'cod',
          orderStatus: 'confirmed',
          taxAmount: order.taxAmount,
          deliveryCharges: order.deliveryCharges,
          orderCreationDate: order.orderCreationDate,
          shippingDate: order.shippingDate
        })
        const data = await body.save();
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

async function calculateAmountAndTaxes(items, totalAmount) {

    // calculate dates
    const orderCreationDate = new Date();
    const shippingDate = new Date(orderCreationDate);
    shippingDate.setDate(orderCreationDate.getDate() + 5);

    const taxAmount = parseFloat((totalAmount*7)/100);
    const deliveryCharges = 30;
    totalAmount = parseFloat(totalAmount + taxAmount + deliveryCharges);

    const newOrder = {
        orderId: `ORDBE_${Date.now().toString()}`,
        items,
        totalAmount,
        orderStatus: 'confirmed',
        taxAmount,
        deliveryCharges,
        orderCreationDate,
        shippingDate
    };

    return newOrder;
}


module.exports = { generateOrder };

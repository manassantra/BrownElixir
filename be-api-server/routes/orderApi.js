const express = require('express'),
      router = express.Router(),
      { verifyCustomerAccess } = require('../middlewares/verifyCustomerAccess');
      orderController = require('../controllers/orders/orderController');

// create order (customer only)
router.post("/create", verifyCustomerAccess, orderController.generateOrder);

module.exports = router;
const jwt = require('jsonwebtoken'),
    Customer = require('../models/customer');
require('dotenv').config({path: '.env'});

// Middleware Function
// Verify API Details
const verifyCustomerAccess = async (req, res, next) => {
  const authHeader = req.headers['authorization'],
    token = authHeader && authHeader.split(' ')[1],
    secretKey = process.env.JWT_CUSTOMER_SECRET;

  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey); // verifies and decodes
      const user = await Customer.findOne({id: decoded.id}); // decode user from token
      if (user) {
        next();
      } else {
        return res.status(409).json({ message: 'Unauthorized User!' });
      }
    } catch (err) {
      return res.status(409).json({ message: 'Access Denied!' });
    }
  } else {
    return res.status(403).json({ message: 'Unauthorized API Access!' });
  }
};

module.exports = {
  verifyCustomerAccess
};

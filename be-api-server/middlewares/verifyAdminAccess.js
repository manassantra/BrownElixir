const jwt = require('jsonwebtoken'),
    AdminUser = require('../models/adminUser');
require('dotenv').config({path: '.env'});

// Middleware Function
// Verify API Details
const verifyAdminAccess = async (req, res, next) => {
  const authHeader = req.headers['authorization'],
    token = authHeader && authHeader.split(' ')[1],
    secretKey = process.env.JWT_ADMIN_SECRET;

  if (token) {
    const decoded = jwt.verify(token, secretKey); // verifies and decodes
    // console.log(decoded);
    const user = await AdminUser.findOne({id: decoded._id}); // decode user from token
    if (user) {
      next();
    } else {
      return res.status(409).json({ message: 'Unauthorized User!' });
    }
  } else {
    return res.status(403).json({ message: 'Unauthorized API Access!' });
  }
};

module.exports = {
    verifyAdminAccess
};

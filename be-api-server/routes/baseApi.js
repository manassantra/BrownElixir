const express = require('express'),
      baseApi = express(),
      productApi = require('./product'),
      accessCheck = require('../middlewares/verifyAdminAccess'),
      securityCheck = require('../middlewares/verifyApiSecret'),
      authRoute = require("./admin/authRoute");

baseApi.use("/admin", securityCheck.verifyApiSecret, authRoute);
baseApi.use("/product", securityCheck.verifyApiSecret, accessCheck.verifyAdminAccess, productApi);


module.exports = baseApi;
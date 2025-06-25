const express = require('express'),
      baseApi = express(),
      productApi = require('./product'),
      customerApi = require('./customer'),
      securityCheck = require('../middlewares/verifyApiSecret'),
      authRoute = require("./authRoute");

baseApi.use("/admin", securityCheck.verifyApiSecret, authRoute);
baseApi.use("/product", securityCheck.verifyApiSecret, productApi);
baseApi.use("/customer", securityCheck.verifyApiSecret, customerApi);


module.exports = baseApi;
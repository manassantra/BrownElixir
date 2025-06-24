const express = require('express'),
      baseApi = express(),
      productApi = require('./product'),
      securityCheck = require('../middlewares/verifyApiSecret'),
      authRoute = require("./admin/authRoute");

baseApi.use("/admin", securityCheck.verifyApiSecret, authRoute);
baseApi.use("/product", securityCheck.verifyApiSecret, productApi);


module.exports = baseApi;
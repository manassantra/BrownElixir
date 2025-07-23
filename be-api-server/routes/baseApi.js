const express = require('express'),
      baseApi = express(),
      productApi = require('./productApi'),
      productCategoryApi = require('./productCategoryApi'),
      customerAuthApi = require('./customerAuthApi'),
      securityCheck = require('../middlewares/verifyApiSecret'),
      adminAuthApi = require('./adminAuthApi'),
      addressApi = require('./addressApi'),
      customerProfileApi = require('./customerApi'),
      orderApi = require('./orderApi');


baseApi.use("/admin", securityCheck.verifyApiSecret, adminAuthApi);
baseApi.use("/product", securityCheck.verifyApiSecret, productApi);
baseApi.use("/customer/auth", securityCheck.verifyApiSecret, customerAuthApi);
baseApi.use("/customer/v1", securityCheck.verifyApiSecret, customerProfileApi);
baseApi.use("/address", securityCheck.verifyApiSecret, addressApi);
baseApi.use("/order/v1", securityCheck.verifyApiSecret, orderApi);
baseApi.use("/product-category", securityCheck.verifyApiSecret, productCategoryApi);


module.exports = baseApi;
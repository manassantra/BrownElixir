const express = require('express'),
      baseApi = express(),
      authRoute = require("./admin/authRoute");

baseApi.use("/admin", authRoute);


module.exports = baseApi;
const express = require("express"),
      authRoute = express(),
      adminUserController = require("../../controllers/admin/adminUserRegistration");


authRoute.post("/register", adminUserController.adminUserRegistration);


module.exports = authRoute;
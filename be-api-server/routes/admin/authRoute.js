const express = require("express"),
      authRoute = express(),
      adminUserController = require("../../controllers/admin/adminUserRegistration"),
      adminUserSignin = require("../../controllers/admin/adminUserSignin");

// create new user
authRoute.post("/register", adminUserController.adminUserRegistration);

// signin user
authRoute.post("/signin", adminUserSignin.adminUserSession);


module.exports = authRoute;
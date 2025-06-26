const express = require("express"),
      router = express.Router(),
      adminUserController = require("../controllers/admin/adminUserRegistration"),
      adminUserSignin = require("../controllers/admin/adminUserSignin");

// create new user
router.post("/register", adminUserController.adminUserRegistration);

// signin user
router.post("/signin", adminUserSignin.adminUserSession);


module.exports = router;
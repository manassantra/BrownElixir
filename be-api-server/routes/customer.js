const express = require("express"),
      router = express.Router(),
      customerRegistration = require("../controllers/customer/customerRegistration"),
      customerSignin = require("../controllers/customer/customerSignin");

// create new user
router.post("/register", customerRegistration.createCustomer);

// signin user
router.post("/signin", customerSignin.customerLoginSession);


module.exports = router;
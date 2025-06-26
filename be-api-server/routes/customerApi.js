const express = require("express"),
      router = express.Router(),
      {verifyAdminAccess} = require('../middlewares/verifyAdminAccess'),
      {verifyCustomerAccess} = require('../middlewares/verifyCustomerAccess'),
      {getAllCustomersList, getCustomerDetails, updateCustomerContactInfo, deleteCustomerProfile} = require('../controllers/customer/customerController');


// Get Customer Profile List (admin access only)
router.get("/admin/all", verifyAdminAccess, getAllCustomersList);

// Get Customer Profile Details (admin & user acces both)
router.get("/secured/admin/:id", verifyAdminAccess, getCustomerDetails);
router.get("/profile/:id", verifyCustomerAccess, getCustomerDetails);

// Update Customer Profile Contact Info (user access only)
router.put("/profile/update/:id", verifyCustomerAccess, updateCustomerContactInfo);

// Delete Customer Profile (user access only)
router.delete("profile/secured/delete/:id", verifyCustomerAccess, deleteCustomerProfile);


module.exports = router;
const bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    Customer = require('../../models/customer');


// create customer session
const customerLoginSession = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({
      status: "Warning",
      message: "Username/Password is missing!"
    });
  }

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
  const user = isEmail
    ? await Customer.findOne({ email: username })
    : await Customer.findOne({ mob: username });

  if (!user) {
    return res.status(404).send({
      status: "Warning",
      message: "User not found!"
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).send({
      status: "Warning",
      message: "Password is incorrect!"
    });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_CUSTOMER_SECRET, { expiresIn: "2h" });

  return res.status(200).send({
    status: "Success",
    user: user.customerName,
    authToken: token,
    expiresIn: 2 * 60 * 60,
    _id: user.id
  });
};

module.exports = { 
    customerLoginSession 
};

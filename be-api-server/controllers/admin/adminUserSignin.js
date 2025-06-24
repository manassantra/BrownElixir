const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminUser = require('../../models/adminUser');

const adminUserSession = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({
      status: "Warning",
      message: "Username/Password is missing!"
    });
  }

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
  const user = isEmail
    ? await AdminUser.findOne({ email: username })
    : await AdminUser.findOne({ mob: username });

  if (!user) {
    return res.status(401).send({
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

  const token = jwt.sign({ id: user.id }, process.env.JWT_ADMIN_SECRET, { expiresIn: "2h" });

  return res.status(200).send({
    status: "Success",
    user: user.fullName,
    authToken: token,
    expiresIn: 2 * 60 * 60,
    _id: user.id
  });
};

module.exports = { adminUserSession };

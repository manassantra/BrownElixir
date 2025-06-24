const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminUser = require('../../models/adminUser'); // adjust if needed

const adminUserSession = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({
            status: "Warning",
            message: "Username/Password is missing!"
        });
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
    let user = isEmail
        ? await AdminUser.findOne({ email: username })
        : await AdminUser.findOne({ mob: username });

    if (!user || (user.email !== username && user.mob !== username)) {
        return res.status(401).send({
            status: "Warning",
            message: "Username/Password is wrong!"
        });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(401).send({
            status: "Warning",
            message: "Password is wrong!"
        });
    }

    const token = jwt.sign({ _id: user.id }, process.env.JWT_USER_SECRET || 'test-secret', { expiresIn: "2h" });

    return res.status(200).send({
        status: "Success",
        user: user.fullName,
        authToken: token,
        expiresIn: 2 * 60 * 60,
        _id: user.id
    });
};

module.exports = { adminUserSession };

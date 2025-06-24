const bcrypt = require('bcrypt');
const crypto = require('crypto');
const AdminUser = require('../../models/adminUser');

const adminUserRegistration = async (req, res) => {
    const { email, mob, fullName, gender, password } = req.body;

    if (!email || !mob) {
        return res.status(400).send({
            status: "Warning",
            message: "Email/Mobile is missing!"
        });
    }

    if (!fullName || !gender || !password) {
        return res.status(400).send({
            status: "Error",
            message: "Full-Name / Gender / Password is missing!"
        });
    }

    const userExists = await ifUserExist(email.trim(), mob.toString().trim());

    if (userExists) {
        return res.status(409).send({
            status: "Error",
            message: "User already exists! \nTry another email & mobile!"
        });
    }

    try {
        const passwordSalt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, passwordSalt);

        const newUser = new AdminUser({
            id: crypto.randomBytes(16).toString("hex"),
            fullName,
            email,
            mob,
            gender,
            password: passwordHash
        });

        const result = await newUser.save();

        if (!result) {
            return res.status(500).send({
                status: "Error",
                message: "There was an error! \nTry again later!"
            });
        }

        return res.status(201).send({
            status: "Success",
            message: "User created successfully"
        });

    } catch (error) {
        return res.status(500).send({
            status: "Error",
            message: "Server error. Please try again later."
        });
    }
};

async function ifUserExist(email, mob) {
    const user = await AdminUser.findOne({
        $or: [{ email }, { mob }]
    });
    return !!user;
}

module.exports = {
    adminUserRegistration
};

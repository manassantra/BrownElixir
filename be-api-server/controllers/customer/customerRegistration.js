const Customer = require('../../models/customer'),
    crypto = require('crypto'),
    bcrypt = require('bcrypt');


// create new customer
const createCustomer = async(req, res) => {
    const { email, mob, customerName, gender, password } = req.body;

    if (!email || !mob) {
        return res.status(400).send({
            status: "Warning",
            message: "Email/Mobile is missing!"
        });
    }

    if (!customerName || !gender || !password) {
        return res.status(400).send({
            status: "Error",
            message: "Name / Gender / Password is missing!"
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

        const newUser = new Customer({
            id: crypto.randomBytes(16).toString("hex"),
            customerName,
            email,
            mob,
            gender,
            password: passwordHash,
            isPremium: false,
            isActive: true
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
}


async function ifUserExist(email, mob) {
    const user = await Customer.findOne({
        $or: [{ email }, { mob }]
    });
    return !!user;
}


module.exports = {
    createCustomer
}
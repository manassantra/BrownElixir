const bcrypt = require('bcrypt'),
      crypto = require('crypto'),
      AdminUser = require('../../models/adminUser');


const adminUserRegistration = async(req, res, next) => {
    if (req.body.email && req.body.mob) {
        if (req.body.fullName && req.body.gender && req.body.password) {
            const user = await ifUserExist(req.body.email?.trim(), req.body.mob?.toString().trim());
            if (!user) {
                let passwordSalt = bcrypt.genSaltSync(10);
                let passwordHash = bcrypt.hashSync(req.body.password, passwordSalt);
                let newuser = new AdminUser({
                    id: crypto.randomBytes(16).toString("hex"),
                    fullName: req.body.fullName,
                    email: req.body.email,
                    mob: req.body.mob,
                    gender: req.body.gender,
                    password: passwordHash
                });
                const result = await newuser.save();
                if (!result) {
                    res.send({status: "Error", status_code: 409, message: "There is an error! \nTry again later!"});
                } else {
                    res.send({status: "Success", status_code: 200, message: "User created successfully"});
                }
            } else {
                res.send({status: "Error", status_code: 409, message: "User alreay exist! \nTry another email & mobile!"});
            }
        } else {
            res.send({status: "Error", status_code: 409, message: "Full-Name / Gender / Password is missing !"});
        }
    } else {
        res.send({status: "Warning", status_code: 404, message: "Email/Mobile is missing !"});
    }
}

async function ifUserExist(email, mob) {
  const user = await AdminUser.findOne({
    $or: [{ email }, { mob }]
  });
  return !!user;
}


module.exports = {
    adminUserRegistration
}
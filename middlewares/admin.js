const jwt = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require('../config');

function adminMiddleware(req, res, next) {
    // Handle cases where Authorization header might not exist
    if (!req.headers.authorization) {
        return res.status(401).json({
            msg: "Authorization header missing"
        });
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.json({
            msg: "token not provided"
        })
    }
    
    try {
        const decoded_admin = jwt.verify(token, JWT_ADMIN_PASSWORD);

        if (decoded_admin) {
            req.adminId = decoded_admin.id;
            next();
        } else {
            res.status(403).json({
                msg: "Cannot Signin"
            })
        }
    } catch (error) {
        res.status(403).json({
            msg: "Enter valid Credentials"
        })
    }

}

module.exports = { adminMiddleware }

// ### Sample Eg. For hashing passwords
// const bcrypt = require("bcrypt");

// async function passwordHashTest(password) {
//   const hash = await bcrypt.hash(password, 5);

//   const result = await bcrypt.compare(password, hash);
//   console.log(result); // true
// }

// passwordHashTest("generic"); 

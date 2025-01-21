const jwt = require('jsonwebtoken');
const { JWT_USER_PASSWORD } = require('../config');

function userMiddleware(req, res, next) {
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
        const decoded_user = jwt.verify(token, JWT_USER_PASSWORD);

        if (decoded_user) {
            req.userId = decoded_user.id;
            next()
        } else {
            res.status(411).json({
                msg: "Cannot Signin"
            })
        }
    } catch (error) {
        res.status(403).json({
            msg: "Enter valid Credentials"
        })
    }
}

module.exports = { userMiddleware }
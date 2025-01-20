// routes/user.js
const express = require("express");
const router = express.Router() ;

router.post("/signup", (req, res) => {
    res.json({
        msg: "Signup Endpoint"
    })
})

router.post("/login", function (req, res) {
    res.json({
        msg: "Signin Endpoint!!"
    })
})

router.get("/purchases", (req, res) => {
    res.json({
        msg: "User Purchased Courses Endpoint"
    })
})

module.exports = {
    userRouter: router
}
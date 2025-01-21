// routes/user.js
const express = require("express");
const router = express.Router() ;
const zod =  require('zod') ;
const jwt = require('jsonwebtoken') ;

const { User } = require("../db.js")
const { JWT_USER_PASSWORD } =   require("../config.js") ;

const signupBody = zod.object({
    email: zod.string().email() ,
    password: zod.string() ,
    firstName: zod.string() ,
    lastName: zod.string() ,
    courseId: zod.string().optional() 
})
//signup
router.post("/signup", async (req, res) => {
    const success = signupBody.safeParse(req.body) ;

    if(!success){
        return res.json({
            msg: "Email already taken/ Incoreect Inputs"
        })
    }

    const existingUser = await User.findOne({
        email: req.body.email
    })

    if (existingUser) {
        return res.json({
            msg: "Email already taken/ Incoreect Inputs"
        })
    }
    try {
        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            courseId: req.body.courseId
        })

        const userId = user._id ;
        const token = jwt.sign({ userId }, JWT_USER_PASSWORD) ;
    
        res.json({
            msg: "User Signup Successfull",
            token: token
        })
    } catch (error) {
        return res.json({
            msg: "Signup Failed"
        })
    }
})
//login
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
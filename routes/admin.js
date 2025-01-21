//  /routes/admin.js
const express = require("express");
const router = express.Router();
const zod = require('zod')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");


const { Admin, Course } = require('../db');
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require('../middlewares/admin')

const saltRounds = 5;

const signupBody = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email(),
    password: zod.string()
})
router.post("/signup", async (req, res) => {
    const success = signupBody.safeParse(req.body);

    if (!success) {
        return res.json({
            msg: "Invalid Inputs"
        })
    }

    const existingAdmin = await Admin.findOne({
        email: req.body.email,
    })

    if (existingAdmin) {
        return res.json({
            msg: "Email already exist"
        })
    }

    try {
        const hashed_password = await bcrypt.hash(req.body.password, saltRounds)
        const admin = await Admin.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashed_password
        })

        const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD);
        res.json({
            msg: "Admin Created Successfully",
            token: token
        })
    } catch (error) {
        res.json({
            msg: "Failed to create Admin Account"
        })
    }
})

const loginBody = zod.object({
    email: zod.string().email(),
    password: zod.string()
})
//login
router.post("/login", async function (req, res) {
    const success = loginBody.safeParse(req.body);

    if (!success) {
        res.status(403).json({
            msg: "Invalid Inputs"
        })
    } else {
        const admin = await Admin.findOne({
            email: req.body.email
        })

        if (admin) {
            try {
                const isCorrect_Password = await bcrypt.compare(req.body.password, admin.password);
                if (!isCorrect_Password) {
                    return res.status(403).json({
                        message: "Invalid Password"
                    })
                }

                const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD);
                res.json({
                    msg: "Login Successful",
                    token: token
                })
            } catch (error) {
                res.status(500).json({
                    msg: "Error comparing passwords",
                    error: error.message
                })
            }
        } else {
            res.status(403).json({
                msg: "Invalid Credentials"
            })
        }
    }
})

const courseBody = zod.object({
    title: zod.string(),
    price: zod.number().positive(),
    imageUrl: zod.string(),
})
// create a course
router.post("/course", adminMiddleware, async function (req, res) {
    const adminId = req.adminId;

    try {
        const course = await Course.create({
            title: req.body.title,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            creatorId: adminId
        })

        res.json({
            msg: "Course Created Successfully",
            courseId: course._id
        })
    } catch (error) {
        return res.json({
            messsage: "Error while creating course"
        })
    }
})

// get all course
router.get("/course/bulk", adminMiddleware, async function (req, res) {
    const adminId = req.adminId;

    try {
        const courses = await Course.find({
            creatorId: adminId
        })
        res.json({
            courses: courses
        })
    } catch (error) {
        res.status(403).json({
            msg: "Cannot get courses"
        })
    }
});

//update course
router.put("/course", adminMiddleware, async function (req, res) {
    const adminId = req.adminId;

    try {
        const course = await Course.updateOne({
            _id: req.body.courseId,
            creatorId: adminId
        }, {
            title: req.body.title,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
        })

        res.json({
            msg: "Course Updated Successfully",
            courseId: course._id
        })
    } catch (error) {
        res.status(411).json({
            msg: "Cannot Update the Course"
        })
    }
})

module.exports = {
    adminRouter: router
}
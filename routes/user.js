// routes/user.js
const express = require("express");
const router = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const { User, Course } = require("../db.js")
const { JWT_USER_PASSWORD } = require("../config.js");
const { userMiddleware } = require("../middlewares/user.js");

const saltRounds = 5;

const signupBody = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email(),
    password: zod.string(),
    courseId: zod.string()
})
//signup
router.post("/signup", async (req, res) => {
    const success = signupBody.safeParse(req.body);

    if (!success) {
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
        const hashed_password = await bcrypt.hash(req.body.password, saltRounds)
        const user = await User.create({
            email: req.body.email,
            password: hashed_password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            courseId: req.body.courseId
        })
        const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD);

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
const loginBody = zod.object({
    email: zod.string().email(),
    password: zod.string()
})
router.post("/login", async function (req, res) {
    const success = loginBody.safeParse(req.body);

    if (!success) {
        res.status(403).json({
            msg: "Invalid Inputs"
        })
    } else {
        const user = await User.findOne({
            email: req.body.email
        })

        if (user) {
            try {
                const isCorrect_Password = await bcrypt.compare(req.body.password, user.password);
                if (!isCorrect_Password) {
                    return res.status(403).json({
                        message: "Invalid Password"
                    })
                }
                const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD);

                res.json({
                    msg: "Signin Successful",
                    token: token
                })
            } catch (error) {
                res.status(500).json({
                    msg: "Error comparing passwords",
                    error: error.message
                })
            }
        } else {
            res.json({
                msg: "Invalid Credentils!!"
            })
        }
    }
})

// buy course
router.patch("/purchase", userMiddleware, async (req, res) => {
    const userId = req.userId;

    const courseId = req.body.courseId;
    if (!courseId) {
        return res.status(411).json({
            msg: "Enter Course Id"
        })
    }

    try {
        const existingCourse = await Course.findById(courseId);

        if (!existingCourse) {
            return res.status(404).json({
                msg: "Course not found"
            });
        }

        // Check if user has already purchased the course
        const user = await User.findById(userId);
        if (user.courseId.includes(courseId)) {
            return res.status(400).json({
                msg: "Course already purchased"
            });
        }
        //should check that the user paid the price
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: { courseId: courseId }
            }
        ).populate('courseId')

        res.status(200).json({
            Message: `Coursed Purchased successfully by ${user.firstName}`,
            "Course Title": existingCourse.title,
            "Course Price": existingCourse.price,
            ImageURL: existingCourse.imageUrl
        })
    } catch (error) {
        console.error("Purchase error:", error);
        res.status(500).json({
            msg: "Failed to purchase course",
            error: error.message
        });
    }

})

//purchased courses
router.get("/purchases", userMiddleware, async function (req,res){
    const userId = req.userId ;

    const  user = await User.findOne({
        _id: userId
    })

    const purchased_course = user.courseId ;
    if (purchased_course) {
        return res.json({
            purchasedCourses: purchased_course
        })
    } else {
        res.status(403).json({
            msg:"No Course Purchases Found"
        })
    }
})

//List All Courses
router.get("/preview", async function (req, res) {
    const courses = await Course.find({}) ;

    if (courses.length > 0) {
        return res.json({
            courses: courses
        })
    } else {
        res.status(411).json({
            msg: "No Courses"
        })
    }
})

module.exports = {
    userRouter: router
}
const express = require("express") ;
const router = express.Router() ;

router.post("/signup", (req,res) => {
    res.json({
        msg: "Signup Endpoint"
    })
})

router.post("/login", function (req, res) {
    res.json({
        msg: "Signin Endpoint!!"
    })
})

// router.use(adminMiddleware) ;

router.get("/course/bulk", function (req, res) {
    res.json({
        msg: "Signin Endpoint!!"
    })
}) ;

router.post("/course", function (req, res) {
    res.json({
        msg: "Signin Endpoint!!"
    })
})

router.put("/course", function (req, res) {
    res.json({
        msg: "Signin Endpoint!!"
    })
})

module.exports = {
    adminRouter: router
}
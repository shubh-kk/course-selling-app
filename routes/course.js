const express = require("express");
const router = express.Router() ; //Router() is a functon

router.post("/purchase", (req, res) => {
    res.json({
        msg: "Buy Course Endpoint"
    })
})

router.get("/bulk", (req, res) => {
    res.json({
        msg: "All Courses Endpoint!!"
    })
})

module.exports = {
    courseRouter: router
}
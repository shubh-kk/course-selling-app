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

// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\\/\\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

// // Hashing a password
// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
// if (err) throw err;
// // Store hash in your password DB
// console.log('Hashed Password:', hash);

// // Verifying a password
// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
// if (err) throw err;
// console.log('Password Match:', result); // true
// });

// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
// if (err) throw err;
// console.log('Password Match:', result); // false
// });
// });
const mongoose = require("mongoose")
const Schema = mongoose.Schema ;
const ObjectId = Schema.Types.ObjectId ;

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { 
        type: String,
        unique: true,
        required: true,
    },
    password: { type: String, min: 3 },
    courseId: [{
        type: ObjectId,
        ref: 'Course'
    },]
})

const courseSchema = new Schema({
    title: { type: String, required: true },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    imageUrl: String,
    creatorId: {
        type: ObjectId,
        ref: "Admin"
    }   
})

const adminSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {type: String, min: 3},
})

const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", courseSchema);
const Admin = mongoose.model("Admin", adminSchema);

module.exports = { User, Course, Admin }
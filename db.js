import mongoose from "mongoose";
const Schema = mongoose.Schema ;
const ObjectId = mongoose.Types.ObjectId ;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastName: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {type: String, min: 3},
    purchasedCourses: [{
        type: ObjectId,
        ref: 'Course'
    },]
})

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    imageUrl: String,
    createrId: {
        type: ObjectId,
        ref: "Admin"
    }   
})

const adminSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastName: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {type: String, min: 3},
})

const userModel = mongoose.model("User", userSchema);
const courseModel = mongoose.model("Course", courseSchema);
const adminModel = mongoose.model("Admin", adminSchema);

module.exports = {
    userModel,
    courseModel,
    adminModel
}
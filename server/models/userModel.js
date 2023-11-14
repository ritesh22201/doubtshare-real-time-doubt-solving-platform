const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    avatar : String,
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    userType : {type : String, enum : ['student', 'tutor'], default : 'student'},
    isVerified : {type : Boolean, default : false},
    grade : {type : String, required : false},
    otp : String
})

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
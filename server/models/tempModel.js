const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    userType : {type : String, enum : ['student', 'tutor'], default : 'student'},
    isVerified : {type : Boolean, default : false},
    otp : String
})

const TempUserModel = mongoose.model('TempUser', tempUserSchema);

module.exports = TempUserModel;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    userType : {type : String, enum : ['student', 'tutor'], required : true},
    isVerified : {type : Boolean, default : false}
})

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
const UserModel = require("../models/userModel");

const validator = async(req, res, next) => {
    const {email, password} = req.body;

    if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/.test(email)) {
        return res.status(400).send({ 'msg': 'Please enter a valid email id!' })
    }

    if(password.length < 8){
        return res.status(400).send({ 'msg': 'Password must be atleast of 8 characters!' });
    }

    if(!/\d/.test(password)){
        return res.status(400).send({ 'msg': 'Password must contain a number!' });
    }

    if(!/[A-Z]/.test(password)){
        return res.status(400).send({ 'msg': 'Password must have an uppercase character!' });
    }

    if(!/[!@#$%&]/.test(password)){
        return res.status(400).send({ 'msg': 'Password must have a special character!' });
    }

    const existedUser = await UserModel.findOne({email});
    if(existedUser){
        return res.status(400).send({ 'msg': 'User already registered!' });
    }

    next();
}

module.exports = validator;
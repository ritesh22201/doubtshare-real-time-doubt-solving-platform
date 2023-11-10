const express = require('express');
const userRouter = express.Router();
const validator = require('../middlewares/validator');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

userRouter.post('/register', validator, async (req, res) => {
    const { password } = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({ ...req.body, password: hashPassword });
        res.status(200).send({ msg: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(400).send({ msg: 'User not found!' });
        }
        else {
            const comparePass = await bcrypt.compare(password, user.password);
            if (!comparePass) {
                res.status(400).send({ msg: 'Incorrect password!' });
            }
            else{
                const token = jwt.sign({userId : user._id, email : user.email}, process.env.secretKey, {expiresIn : '2d'});
                res.status(200).send({msg : 'User logged in successfully', token, email : user.email});
            }
        }
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})

module.exports = userRouter;
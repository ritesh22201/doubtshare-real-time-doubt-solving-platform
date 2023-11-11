const express = require('express');
const userRouter = express.Router();
const validator = require('../middlewares/validator');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const BlacklistModel = require('../models/blacklistModel');
const TempUserModel = require('../models/tempModel');
const { sendOTP } = require('../utils/email');
require('dotenv').config();

userRouter.post('/register', validator, async (req, res) => {
    const { email, password } = req.body;
    try {
        const existedTempUser = await TempUserModel.findOne({ email });
        if (existedTempUser) {
            await TempUserModel.deleteOne({ email });
        }

        const otp = Math.floor(900000 * Math.random());
        await sendOTP(email, otp);

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await TempUserModel.create({ ...req.body, password: hashPassword, otp });
        res.status(200).send({ msg: 'OTP sent for verification' });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})

userRouter.post('/verify', async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await TempUserModel.findOne({ email });

        if (!user) {
            return res.status(400).send({ msg: 'User not found!' });
        }

        if (otp !== user.otp) {
            return res.status(400).send({ msg: 'Invalid OTP!' });
        }

        const newUser = new UserModel({
            email: user.email,
            password: user.password,
            userType: user.userType,
            isVerified: true
        })

        await newUser.save();

        const deleteTempUser = await TempUserModel.deleteOne({ email });
        const token = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.secretKey, { expiresIn: '7d' });
        res.status(200).send({ msg: 'User registered successfully', token, email: user.email });

    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})

userRouter.post('/forgetPassword', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ msg: 'User not found!' });
        }

        const otp = Math.floor(900000 * Math.random());
        await sendOTP(email, otp);

        user.otp = otp;
        await user.save();

        res.status(200).send({ msg: 'OTP sent for verification' });

    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})

userRouter.post('/verifyOtp', async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ msg: 'User not found!' });
        }

        if (otp !== user.otp) {
            return res.status(400).send({ msg: 'Invalid OTP!' });
        }

        res.status(200).send({ msg: 'OTP verified successfully' });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})

userRouter.post('/changePassword', async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ msg: 'User not found!' });
        }

        const samePassCheck = await bcrypt.compare(newPassword, user.password);
        if (samePassCheck) {
            return res.status(400).send({ msg: "Old and new passwords can't be same!" });
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;
        user.otp = '';
        await user.save();

        res.status(200).send({msg : 'Password updated successfully'});
        
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
            else {
                const token = jwt.sign({ userId: user._id, email: user.email }, process.env.secretKey, { expiresIn: '2d' });
                user.isVerified = true;
                await user.save();
                res.status(200).send({ msg: 'User logged in successfully', token, email: user.email });
            }
        }
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})

userRouter.get('/logout', async (req, res) => {
    const { email } = req.body;
    const token = req.headers?.authorization?.split(' ')[1];
    try {
        const loggedInUser = await UserModel.findOne({ email, isVerified: true });
        if (!loggedInUser) {
            return res.status(400).send({ msg: 'User not found, please login again!' });
        }

        loggedInUser.isVerified = false;
        await loggedInUser.save();

        const blacklistUser = await BlacklistModel.create({ token });

        res.status(200).send({ msg: 'User logged out successfully' });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})

module.exports = userRouter;
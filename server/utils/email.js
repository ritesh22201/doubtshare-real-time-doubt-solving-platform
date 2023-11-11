const nodemailer = require('nodemailer');
require('dotenv').config();

const sendOTP = async(toEmail, otp) => {
    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'riteshgoswami22201@gmail.com',
            pass : process.env.password
        }
    })

    const mailOptions = {
        from : 'riteshgoswami22201@gmail.com',
        to : toEmail,
        subject : 'OTP Verification',
        text : `Your OTP verification code is: ${otp}`
    }

    await transporter.sendMail(mailOptions);
}

module.exports = {sendOTP}; 
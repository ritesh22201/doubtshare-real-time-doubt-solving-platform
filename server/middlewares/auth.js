const jwt = require('jsonwebtoken');
const BlacklistModel = require('../models/blacklistModel');
require('dotenv').config();

const auth = async (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];

    if (!token) {
        return res.status(400).send({ msg: 'Auth token not found!' });
    }

    const loggedOutUser = await BlacklistModel.findOne({token});
    if(loggedOutUser){
        return res.status(400).send({msg : 'User logged out, please login again!'});
    }

    jwt.verify(token, process.env.secretKey, (err, decoded) => {
        if (decoded) {
            req.body.userId = decoded.userId;
            req.body.email = decoded.email;
            next();
        }
        else {
            res.status(400).send({ msg: 'Invalid token!' });
        }
    })
}

module.exports = auth;
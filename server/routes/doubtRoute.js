const express = require('express');
const auth = require('../middlewares/auth');
const DoubtModel = require('../models/doubtModel');
const doubtRouter = express.Router();

doubtRouter.get('/history', auth, async (req, res) => {
    try {
        const studentId = req.body.userId;
        const doubtHistory = await DoubtModel.find({ studentId }).sort({ timestamp: -1 });
        res.status(200).send({ doubtHistory });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})

doubtRouter.post('/createDoubt', auth, async (req, res) => {
    const { subject, question } = req.body;
    try {
        const studentId = req.body.userId;
        const doubt = await DoubtModel.create({studentId, subject, question});
        res.status(200).send({msg : 'Doubt created successfully', doubt});
    } catch (error) {
        res.status(400).send({msg : error.message});
    }
})

module.exports = doubtRouter;
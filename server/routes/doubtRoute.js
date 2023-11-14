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
    const { subject, question, language } = req.body;
    try {
        const studentId = req.body.userId;
        const doubt = await DoubtModel.create({studentId, subject, question, language});
        res.status(200).send({msg : 'Doubt posted successfully', doubt});
    } catch (error) {
        res.status(400).send({msg : error.message});
    }
})

doubtRouter.patch('/updateDoubt/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const doubt = await DoubtModel.findOne({_id : id});
        if(!doubt){
            return res.status(400).send({msg : 'Doubt not found!'});
        }

        doubt.isResolved = !doubt.isResolved;
        await doubt.save();

        res.status(200).send({msg : 'Doubt updated successfully', doubt});
    } catch (error) {
        res.status(400).send({msg : error.message});
    }
})

doubtRouter.delete('/deleteDoubt/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const doubt = await DoubtModel.findByIdAndDelete({_id : id});
        res.status(200).send({msg : 'Doubt deleted successfully', doubt});
    } catch (error) {
        res.status(400).send({msg : error.message});
    }
})

module.exports = doubtRouter;
const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema({
    studentId : {type : mongoose.Schema.Types.ObjectId, ref : 'user', required : true},
    subject : {type : String, required : true},
    question : {type : String, required : true},
    isResolved : {type : Boolean, default : false},
    timestamp : {type : Date, default : Date.now}
})

const DoubtModel = mongoose.model('doubt', doubtSchema);

module.exports = DoubtModel;
const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema // mongoose.Schema.ObjectId

const userSchema = new mongoose.Schema({
    username: {
        type:  String,
        trim: true,
        unique: true,
        min: 3,
        max: 160,
        index: true,
        required : true
    },
    password: {
        type:  String,
        index: true,
        lowercase: true
    },
    mtoken: {
        type : String,
        required: true,
        min: 3,
        max: 200000
    },
    sessionid: {
        type: String
    }
},{timestamps: true});

module.exports = mongoose.model('User',userSchema);


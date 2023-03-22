const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    allowedStar: { type: Number, default: 50, max: 50 ,required: true}

}, { timestamps: true })


const User = mongoose.model('user', userSchema)
module.exports = User
const mongoose = require('mongoose')

const optionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

}, { timestamps: true })


const Option = mongoose.model('option', optionSchema)
module.exports = Option
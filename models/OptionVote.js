const mongoose = require('mongoose')

const optionVoteSchema = mongoose.Schema({
    optionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option'
    },
    userVote: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        star: { type: Number, min: 1, max: 5 }
    }]
}, { timestamps: true })


const OptionVote = mongoose.model('optionVote', optionVoteSchema)
module.exports = OptionVote
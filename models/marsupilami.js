const mongoose = require('mongoose');

const MarsupilamiSchema = mongoose.Schema({
    username : {
        type : String,
        required: true
    },
    password: {
        type: String,
        required:true
    },
    age:{
        type: Number
    },
    family:{
        type: String
    },
    race:{
        type: String
    },
    food:{
        type: String
    },
    friends:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'marsupilami'
    }],
    isFriends : {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('marsupilami', MarsupilamiSchema)
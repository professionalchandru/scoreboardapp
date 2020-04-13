const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    eventname: {
        type: String,
        required: true    
    },
    eventtype: {
        type: String,
        required: true        
    },
    players: {
        type: Array,
        required: true
    },
    eventdate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('data',dataSchema);
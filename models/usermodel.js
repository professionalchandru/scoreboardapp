const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 8,
        max: 800,
        required: true

    },
    registereddate: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('register', registerSchema);
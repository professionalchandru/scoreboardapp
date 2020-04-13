const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    eventname: {
        type: String,
        required: true,
        unique: true
    },
    eventtype: {
        type: String,
        required: true
    },
    players: [{
            player1: {
                name: {
                    type: String,
                    required: true
                },
                sprno: {
                    type: Number,
                    required: true,
                    unique: true
                },
                department: {
                    type: String,
                    required: true
                },
                year: {
                    type: Number,
                    required: true
                },
                timing: {
                    type: Number,
                    required: true
                }
            }
        },
        {
            player2: {
                name: {
                    type: String,
                    required: true
                },
                sprno: {
                    type: Number,
                    required: true,
                    unique: true
                },
                department: {
                    type: String,
                    required: true
                },
                year: {
                    type: Number,
                    required: true
                },
                timing: {
                    type: Number,
                    required: true
                }
            }
        },
        {
            player3: {
                name: {
                    type: String,
                    required: true
                },
                sprno: {
                    type: Number,
                    required: true,
                    unique: true
                },
                department: {
                    type: String,
                    required: true
                },
                year: {
                    type: Number,
                    required: true
                },
                timing: {
                    type: Number,
                    required: true
                }
            }
        }
    ],
    eventdate: {
        type: Date,
        default: Date.now
    }
})
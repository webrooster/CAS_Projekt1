const mongoose = require('mongoose');
const note = mongoose.Schema({
    title: { 
        type: String,
        required: true
    },
    description: {
        type: String
    },
    created: {
        type: Date,
        required: false,
        default: Date.now
    },
    importance: {
        type: Number,
        required: false
    },
    expire: {
        type: String,
        required: false
    },
    complete: {
        type: Boolean,
        required: false
    },
    completed_at: {
        type: Date,
        required: false,
        default: Date.now
    }
});

module.exports = mongoose.model('Note', note);
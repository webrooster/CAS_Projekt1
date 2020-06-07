const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    created: {
        type: Date,
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
        default: Date.now
    }
});

module.exports = mongoose.model('Note', noteSchema);
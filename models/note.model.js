const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    importance: {
        type: Number,
        required: true
    },
    expire: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        required: true
    },
    completed_at: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Note', noteSchema);
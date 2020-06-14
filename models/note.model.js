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
        type: String,
        required: true
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
        required: false
    },
    completed_at: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Note', noteSchema);
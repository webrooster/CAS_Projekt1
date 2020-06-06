const mongoose = require('mongoose');

// NOTE SCHEMA
const notesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String},
    created: { type: String, required: true },
    importance: { type: Number, required: true},
    expire: { type: String, required: true },
    complete: { type: Boolean, required: true },
    completed_at: { type: String, required: true }
});

module.exports = notesSchema;
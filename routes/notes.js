const express = require('express');
const router = express.Router();
const Note = require('../models/note.model');

// GET ALL NOTES
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// GET NOTE
router.get('/:id', (req, res) => {
    res.send(req.params.id)
});

// CREATE NOTE
router.post('/', async (req, res) => {
    const note = new Note({
        title: req.body.title,
        description: req.body.description,
        created: req.body.created,
        importance: req.body.importance,
        expire: req.body.expire,
        complete: req.body.complete,
        completed_at: req.body.completed_at
    });

    try {
        console.log(note);
        const addNote = await note.save();
        res.status(201).json(addNote);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE NOTE
router.patch('/', (req, res) => {

});

// DELETE NOTE
router.delete('/:id', (req, res) => {

});

module.exports = router;

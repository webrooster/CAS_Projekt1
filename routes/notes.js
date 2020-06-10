const express = require('express');
const router = express.Router();
const Note = require('../models/note.model');

// GET ALL NOTES
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET NOTE
router.get('/:id', getNote, (req, res) => {
    res.json(res.note);
});

// CREATE NOTE
router.post('/', async (req, res) => {
    console.log(req.body);
    let note = new Note({
        title: req.body.title,
        description: req.body.description,
        created: req.body.created,
        importance: req.body.importance,
        expire: req.body.expire,
        complete: req.body.complete,
        completed_at: req.body.completed_at
    });

    try {
        let addNote = await note.save();
        res.status(201).json(addNote);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE NOTE
router.patch('/:id', getNote, async (req, res) => {
    if (req.body.title !== null) {
        res.note.title = req.body.title;
    }
    if (req.body.description !== null) {
        res.note.description = req.body.description;
    }

    if (req.body.importance !== null) {
        res.note.importance = req.body.importance;
    }

    if (req.body.expire !== null) {
        res.note.expire = req.body.expire;
    }

    if (req.body.complete !== null) {
        res.note.complete = req.body.complete;
    }
    
    // if (req.body.created_at !== null) {
    //     res.note.completed_at = req.body.completed_at;
    // } 

    try {
        const updatedNote = await res.note.save();
        res.json(updatedNote);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE NOTE
router.delete('/:id', getNote, async (req, res) => {
    try {
        await res.note.remove();
        res.json({ message: 'Deleted Note successfully!' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});


async function getNote(req, res, next) {
    let note;
    try {
        note = await Note.findById(req.params.id);
        if (note == null) {
            return res.status(404).json('This note does not exists');
        }
    } catch {
        return res.status(500).json({ message: err.message });
    }

    res.note = note;
    next();
}

module.exports = router;

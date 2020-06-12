'use strict';

import { NoteStorage } from './storage/note-storage.js';
import { NoteService } from './services/note-service.js';
import { NoteController } from './controller/note-controller.js';

class NotesApp {
    constructor() {}

    async start() {
        const noteDataStorage = await NoteStorage.create();
        const noteService = new NoteService(noteDataStorage);
        new NoteController(noteService).noteAction();
    }
}

const notesApp = new NotesApp();
// LOADING APP
document.addEventListener('DOMContentLoaded', notesApp.start());
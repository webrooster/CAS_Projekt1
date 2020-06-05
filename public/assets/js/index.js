'use strict';
import { NoteStorage } from './storage/note-storage.js';
import { NoteService } from './services/note-service.js';
import { NoteController } from './controller/note-controller.js';

class NotesApp {
    static start() {
        const noteDataStorage = new NoteStorage();
        const noteService = new NoteService(noteDataStorage);
        new NoteController(noteService).noteAction();
    }
}

// LOADING APP
document.addEventListener('DOMContentLoaded', NotesApp.start);
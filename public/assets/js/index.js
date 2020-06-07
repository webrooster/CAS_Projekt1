'use strict';
import { NoteStorage } from './storage/note-storage.js';
import { NoteService } from './services/note-service.js';
import { NoteController } from './controller/note-controller.js';

class NotesApp {
    static start() {
        const noteDataStorage = NoteStorage
        .create()
        .then(
            (data) => {
                const noteService = new NoteService(noteDataStorage, data.notes);
                console.log('THEN', noteService, noteDataStorage, data.notes);
                new NoteController(noteService).noteAction(data.notes);
            }
        )    
    }
}

// LOADING APP
document.addEventListener('DOMContentLoaded', NotesApp.start);
'use strict';

import { notesctrl } from '../components/notes-controller.js';

class NotesListingView {
    init() {
        this.showNotesListModule();
        console.log('NOTESLISTINGVIEW loaded');        
    }

    showNotesListModule() {
        const notes = notesctrl.getNotes();

        // cache #notes-list DOM
        const $notesListUI = document.getElementById('notes-list');

        // Clear HTML from the DOM
        $notesListUI.innerHTML = '';

        for (let i = 0; i < notes.length; i++) {
            const element = notes[i];
            console.log(element);
                        
        }

    }
}

export let noteslisting = new NotesListingView();
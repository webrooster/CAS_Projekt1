'use strict';

import { notesctrl } from '../components/notes-controller.js';

class NotesListingView {
    init() {
        this.showNotesListModule();       
    }

    showNotesListModule() {
        const notes = notesctrl.getNotes();
        notes.sort();

        const $notesListUI = document.getElementById('notes-list');
        $notesListUI.innerHTML = '';

        for (let i = 0; i < notes.length; i++) {
            const item = notes[i];
            
            console.table(item);
            
            let $li = document.createElement('li');
            $li.setAttribute('class', 'notes-list-item');
            $li.setAttribute('data-index', i);
            $li.innerHTML = `${notes[i]['title']} <span>${notes[i]['description']}</span>`;
            $notesListUI.append($li);
        }
    }

    showNotesDetailsModule(e) {
        let selectedIndex = null;

        if (typeof e === 'object') {
            e.stopProgagation();
            selectedIndex = this.getAttribute('data-index');
            console.log(selectedIndex);            
        } else {
            selectedIndex = e;
        }
    }
}

export let noteslisting = new NotesListingView();
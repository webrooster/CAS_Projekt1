'use strict';

import { notesctrl } from '../components/notes-controller.js';

class NotesListingView {
    init() {
        this.showNotesListModule();
        this.sortByFinishedDate();
        this.addNewNote();
    }
    
    addNewNote() {
        const newnote = notesctrl.addNote();
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
    
    sortByFinishedDate() {
        const $sortByFinishedDate = document.getElementById('sortByFinishedDate');
        const $notesListUI = document.getElementById('notes-list');
        
        $sortByFinishedDate.addEventListener('click', function() {
            $notesListUI.innerHTML = '';
            console.log('clicked');
        });
    }
}

export let noteslisting = new NotesListingView();
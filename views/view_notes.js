'use strict';
/**
 * @class NotesView
 * 
 * @description Visual representation of the view.
 * @param notesview
 * 
 */

import { notesctrl } from '../controls/ctrl_notes.js';

class NotesView {
    
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
            console.log('sortByFinishedDate');
        });
    }
}

export let notesview = new NotesView();
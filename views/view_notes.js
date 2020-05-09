'use strict';
/**
 * @class notesView
 * 
 * @description Visual representation of the view.
 * 
 */

import { NotesApp } from '../controls/ctrl_notes.js';

class NotesView {
    constructor() {

        // UI ELEMENTS
        this.$addNote = document.querySelector('#addnote');
        this.$deleteNote = document.querySelectorAll('.deletenote');
        this.$addNoteInput = document.querySelector('#addNoteInput');
        this.$sortByFinishedDate = document.querySelector('#sortByFinishedDate');
        this.$notesList = document.querySelector('#notes-list');
    }
    
    init() {    
        this.addNote();
        // this.sortByFinishedDate();
        this.showNotesListModule();
        this.deleteNote();
        this.toggleTheme();
    }

    
    deleteNote = () => {
        const list = this.$notesList;
        list.addEventListener('click', event => {
            if (event.target.className == 'deletenote' || event.target.classList[1] == 'fa-trash') {
                const noteToBeDeleted = event.target.parentElement.getAttribute('data-index');
                this.deleteNoteClicked(noteToBeDeleted);
            }
        })
    };
    
    deleteNoteClicked = (id) => {
        if (id !== null) NotesApp.deleteNote(id);
        this.showNotesListModule();
    };
    
    
    // addNoteOnBlur = () => {
        //     this.$addNoteInput.value = '';
        // };
        
    addNote = () => {
        // this.$addNoteInput.addEventListener('blur', this.addNoteOnBlur.bind(this));
        this.$addNote.addEventListener('click', this.addNoteClicked.bind(this));
    };

    addNoteClicked = (event) => {
        event.preventDefault();
        const addNoteInputText = this.$addNoteInput.value;
        
        let newNote = {};
        let key = 'title';
        let value = addNoteInputText;
        newNote[key] = value;
        
        if (addNoteInputText !== '') NotesApp.addNote(newNote);
        this.$addNoteInput.value = '';
        this.showNotesListModule();
        console.log('addNoteClicked', event.target, addNoteInputText);
    }

    // sortByFinishedDate = () => {
    //     this.$sortByFinishedDate.addEventListener('click', (event) => {
    //         event.preventDefault();
    //         console.log('$sortByFinishedDate', this.$sortByFinishedDate);
    //     });
    // };

    showNotesListModule = () => {
        const notes = NotesApp.getNotes().sort();
        this.$notesList.innerHTML = '';
        console.log('notes', notes.length);
        
        if (notes.length > 0) {
            for (let i = 0; i < notes.length; i++) {
                const item = notes[i];                        
                let $li = document.createElement('li');          
                $li.setAttribute('class', 'notes-list-item');
                $li.setAttribute('id', i);
                $li.setAttribute('data-index', i);
                $li.innerHTML = `
                    <button data-index="${i}">
                        <i class="far fa-check-circle"></i>
                    </button>
                    <button data-index="${i}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <input class="note-title" type="text" data-title="${notes[i]['title']}" value="${notes[i]['title']}">
                    <input type="text" data-created_at="${notes[i]['created_at']}" value="${notes[i]['created_at']}">
                    <input type="text" data-expire="${notes[i]['expire']}" value="${notes[i]['expire']}">
                    <button class="deletenote" data-index="${i}" data-delete="1">
                        <i class="fas fa-trash"></i>
                    </button>
                    `;
                this.$notesList.append($li);
                // console.table(item);
            }
        } else {
            console.log('list is empty');
            let $li = document.createElement('li');          
            $li.setAttribute('class', 'notes-list-item');
            $li.innerHTML = `Da sind keine Notes. Füge eine Note hinzu!`;
            this.$notesList.append($li);    
        }
    };

    toggleTheme = () => {
        const $toggleTheme = document.querySelector('#toggleTheme');
        $toggleTheme.addEventListener('click', () => {
            document.body.classList.toggle('bright');
            console.log('toggleTheme clicked', $toggleTheme);
        });
    };
}

export const notesView = new NotesView();
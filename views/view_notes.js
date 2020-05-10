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
        // this.$inputField = document.querySelectorAll('[data-field]');
    }
    
    init() {    
        this.updateNote();
        this.addNote();
        this.doneNote();
        // this.sortByFinishedDate();
        this.showNotesListModule();
        this.deleteNote();
        this.toggleTheme();
    }

    updateNote() {
        const list = this.$notesList;
        list.addEventListener('click', event => {
            if (event.target.classList == 'note-datas') {
                const dataIndex = event.target.parentElement.getAttribute('data-index');
                const dataField = event.target.getAttribute('data-field');
                const dataValue = event.target.value;
                this.updateNoteToStore(dataIndex, dataField, dataValue);
                console.log('dataIndex', dataIndex, 'dataField', dataField, dataValue);
            }
        })
    }

    updateNoteToStore(dataIndex, dataField, dataValue) {
        let updateNote = {
            index: dataIndex,
            title: dataValue
        }
        // console.log('UPDATEFIELD', updateNote, updateNote.index);
        NotesApp.updateNote(updateNote);
    }

    doneNote() {
        const list = this.$notesList;
        list.addEventListener('click', event => {
            if (event.target.classList[1] == 'done' || event.target.classList[2] == 'done') {
                const dataIndex = event.target.parentElement.getAttribute('data-index');
                const dataDone = event.target.parentElement.getAttribute('data-done');
                this.doneNoteClicked(dataIndex, dataDone);   
            }
        })
    }

    doneNoteClicked(dataIndex, dataDone) {
        let noteDone = {
            index: dataIndex,
            done: dataDone ^= true
        }
        NotesApp.doneNote(noteDone);
        this.showNotesListModule();
    };
    
    deleteNote() {
        const list = this.$notesList;
        list.addEventListener('click', event => {
            if (event.target.className == 'deletenote' || event.target.classList[1] == 'fa-trash') {
                const noteToBeDeleted = event.target.parentElement.getAttribute('data-index');
                this.deleteNoteClicked(noteToBeDeleted);
            }
        })
    };
    
    deleteNoteClicked(id) {
        if (id !== null) NotesApp.deleteNote(id);
        this.showNotesListModule();
    };
        
    addNote() {
        // this.$addNoteInput.addEventListener('blur', this.addNoteOnBlur.bind(this));
        this.$addNote.addEventListener('click', this.addNoteClicked.bind(this));
    };

    // TODO -> INCLUDE ALL FIELDS
    addNoteClicked(event) {
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

    showNotesListModule() {
        const notes = NotesApp.getNotes();
        console.log('notes shoNotesListModule', notes);
        
        this.$notesList.innerHTML = '';
        
        if (notes.length) {
            for (let i = 0; i < notes.length; i++) {
                const item = notes[i];              
                console.log(item.finished);
                
                let $li = document.createElement('li');          
                $li.setAttribute('class', 'notes-list-item');
                $li.setAttribute('data-index', i);
                $li.innerHTML = `
                    <button class="note-datas done" data-index="${i}" type="text" data-done="${ item.done }">
                        <i class="far fa-check-circle done"></i>
                    </button>
                    <button class="note-datas edit" data-index="${i}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <input class="note-datas" type="text" data-index="${ i }" data-field="title" data-title="${ item.title }" value="${ item.title }">
                    <input class="note-datas" type="text" data-created_at="${ item.created_at}" value="${ item.created_at }">
                    <input class="note-datas" type="text" data-due_date="${ item.due_date }" value="${ item.due_date }">
                    <input class="note-datas" type="text" data-importance="${ item.importance }" value="${ item.importance }">
                    <button class="deletenote" data-index="${ i }" data-delete="1">
                        <i class="fas fa-trash"></i>
                    </button>
                    `;
                this.$notesList.append($li);
                // console.table(item);
            }
        } else {
            let $li = document.createElement('li');          
            $li.setAttribute('class', 'notes-list-item');
            $li.innerHTML = `Da sind keine Notes. Füge eine Note hinzu!`;
            this.$notesList.append($li);    
        }
    };

    toggleTheme() {
        const $toggleTheme = document.querySelector('#toggleTheme');
        $toggleTheme.addEventListener('click', () => {
            document.body.classList.toggle('bright');
        });
    };
}

export const notesView = new NotesView();
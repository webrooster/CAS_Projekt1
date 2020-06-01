'use strict';

import { Note } from '../models/note.js';

/* MOCK DATAS */
const mockdatas = [
    {   
        "id": "654654",
        "title": "First note",
        "created": "01.01.2020",
        "description": "Bla bla bla hier, und blabla dort.",
        "importance" : 3,
        "expire": "date expire",
        "complete": 0,
        "completed_at": ""
    },
    {
        "id": "645654",
        "title": "Second note",
        "created": "02.02.2020",
        "description": "Auch hier darf eine Beschreibung rein, aber die Zeichenlänge muss begrenzt werden.",
        "importance" : 2,
        "expire": "date expire",
        "complete": 1,
        "completed_at": ""
    },
    {
        "id": "78998",
        "title": "Third note",
        "created": "03.03.2020",
        "description": "Lorem ipsum dolor sit amet",
        "importance" : 5,
        "expire": "date expire",
        "complete": 1,
        "completed_at": ""
    },
    {
        "id": "789987",
        "title": "Fourth note",
        "created": "04.04.2020",
        "description": "Lorem ipsum dolor sit amet",
        "importance" : 4,
        "expire": "date expire",
        "complete": 0,
        "completed_at": ""
    },    
  ];

export class NoteService {
    constructor(noteStorage) {
        this.storage = noteStorage;
        this.notes = [];
    }

    // SORT CREATED DATE
    sortFinishedAt(sortState) {
        const sortingList = this.notes.filter(a => a.complete );
        
        sortingList.sort((a, b) => {
            //console.log('finished_at', a.completed_at, b.completed_at, 'title', a.title);
            if (sortState === false) return new Date(b.completed_at) - new Date(a.completed_at);
            if (sortState === true) return new Date(a.completed_at) - new Date(b.completed_at);
        });
        
        // RENDER RESULT LIST
        this.notes = sortingList;
    }

    // SORT CREATED DATE
    sortCreatedAt(sortState) {
        const sortingList = this.notes;
        sortingList.sort((a, b) => {
            //console.log('created', a.created, b.created);
            if (sortState === false) return new Date(b.created) - new Date(a.created);
            if (sortState === true) return new Date(a.created) - new Date(b.created);
        });
    }

    // SORT COMPLETED
    sortCompleted(sortState) {
        const sortingList = this.notes;
        sortingList.sort((a, b) => {
            if (sortState === false) return  b.complete - a.complete;
            if (sortState === true) return  a.complete - b.complete;
        });

        this.notes = sortingList;
    }

    // SORT IMPORTANCE
    sortImportance(sortState) {
        const sortingList = this.notes;
        sortingList.sort((a, b) => {
            if (sortState === false) return  b.importance - a.importance;
            if (sortState === true) return  a.importance - b.importance;
        });
    }

    // UPDATE STATUS PANEL
    statusPanel() {
        return this.storage.getStatus();
    }

    // LOAD DATA
    loadData() {
        this.notes = this.storage.getNotes();
        /**
         * MOCKDATAS
         */ 
        // if (this.notes.length === 0) {
            //     mockdatas.forEach(mock => {
            //         this.notes.push(new Note(mock));
            //     });
            //     this.saveNotes();
        // }

        return this.notes;
    }

    // NOTE UPDATE
    updateNote(datas) {
        console.log('SERVICE UPDATE NOTE', datas, datas.noteIndex);
        const findNote = this.notes.find(x => x.id === datas.noteId);
        this.notes[datas.noteIndex].title = datas.title;
        this.notes[datas.noteIndex].description = datas.description;
        this.notes[datas.noteIndex].expire = datas.expire;
        this.notes[datas.noteIndex].importance = datas.importance;

        this.storage.update(this.notes);
    }

    // GET NOTE DATAS
    getNoteDatas(dataId, dataIndex) {
        console.log('SERVICE GET NOTE DATAS', dataId, dataIndex, this.notes[dataId])
        const noteDatas = this.notes[dataId];
        console.log('this fucking index', dataId);
        
        return {
            noteDatas,    
            dataId
        }
    }

    // NOTE DELETE
    deleteNote(dataId, dataIndex) {
        if (this.notes[dataId].id === dataIndex) this.notes.splice(dataId, 1), this.storage.update(this.notes);
    }

    // NOTE COMPLETE
    completeNote(dataId, dataIndex) {
        
        if (this.notes[dataId].id === dataIndex && this.notes[dataId].completed_at == '') {
            this.notes[dataId].completed_at = new Date(),
            this.notes[dataId].complete ^= true,
            this.storage.update(this.notes);

        } else {
            this.notes[dataId].completed_at = new Date(),
            this.notes[dataId].complete ^= true,
            this.storage.update(this.notes);
        }    
    }

    // ADD NEW NOTE
    addNote(note) {
        this.storage.createNote(new Note(note));
    }

    // SAVE NOTE
    saveNotes() {
        this.storage.update(this.notes.map(note => note.toJSON()));
    }
}
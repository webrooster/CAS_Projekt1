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
        const sortingList = this.notes;
        sortingList.sort((a, b) => {
            console.log('finished_at', a.completed_at, b.completed_at);
            if (sortState === false) return new Date(b.completed_at) - new Date(a.completed_at);
            if (sortState === true) return new Date(a.completed_at) - new Date(b.completed_at);
        });
    }

    // SORT CREATED DATE
    sortCreatedAt(sortState) {
        const sortingList = this.notes;
        sortingList.sort((a, b) => {
            console.log('created', a.created, b.created);
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
        })
    }

    // SORT IMPORTANCE
    sortImportance(sortState) {
        const sortingList = this.notes;
        sortingList.sort((a, b) => {
            if (sortState === false) return  b.importance - a.importance;
            if (sortState === true) return  a.importance - b.importance;
        })
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
    }

    // NOTE COMPLETE
    completeNote(dataId, dataIndex) {
        
        if (this.notes[dataId].id === dataIndex && this.notes[dataId].completed_at == '') {
            this.notes[dataId].completed_at = new Date() || '',
            this.notes[dataId].complete ^= true,
            this.storage.completeNote();

        } else {
            this.notes[dataId].completed_at = '',
            this.notes[dataId].complete ^= true,
            this.storage.completeNote();
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
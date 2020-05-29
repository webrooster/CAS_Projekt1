import { Note } from '../models/note.js';

/* MOCK DATAS */
const mockdatas = [
    {   
        "id": "654654",
        "title": "First note",
        "created": "",
        "description": "Bla bla bla hier, und blabla dort.",
        "importance" : 3,
        "expire": "date expire",
        "complete": 0,
        "completed_at": ""
    },
    {
        "id": "645654",
        "title": "Second note",
        "created": "",
        "description": "Auch hier darf eine Beschreibung rein, aber die Zeichenlänge muss begrenzt werden.",
        "importance" : 2,
        "expire": "date expire",
        "complete": 1,
        "completed_at": ""
    },
    {
        "id": "78998",
        "title": "Third note",
        "created": "",
        "description": "Lorem ipsum dolor sit amet",
        "importance" : 5,
        "expire": "date expire",
        "complete": 1,
        "completed_at": ""
    },
    {
        "id": "789987",
        "title": "Fourth note",
        "created": "",
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
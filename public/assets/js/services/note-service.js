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
        "complete": true,
        "completed_at": ""
    },
    {
        "id": "645654",
        "title": "Second note",
        "created": "",
        "description": "Auch hier darf eine Beschreibung rein, aber die Zeichenlänge muss begrenzt werden.",
        "importance" : 2,
        "expire": "date expire",
        "complete": false,
        "completed_at": ""
    },
    {
        "id": "78998",
        "title": "Third note",
        "created": "",
        "description": "Lorem ipsum dolor sit amet",
        "importance" : 5,
        "expire": "date expire",
        "complete": true,
        "completed_at": ""
    },
    {
        "id": "789987",
        "title": "Fourth note",
        "created": "",
        "description": "Lorem ipsum dolor sit amet",
        "importance" : 4,
        "expire": "date expire",
        "complete": false,
        "completed_at": ""
    },    
  ];

export class NoteService {
    constructor(noteStorage) {
        this.storage = noteStorage;
        console.log('this.storage', this.storage);
        this.note = [];
    }

    // LOAD DATA
    loadData() {
        this.note = this.storage.getNotes();

        console.log('this fucking note', this.note);

        if (this.note.length === 0) {
            console.log('localstorage is empty');

            mockdatas.forEach(mock => {
                this.note.push(new Note(mock));
            });
            this.saveNote();
        }

    }

    // SAVE NOTE
    saveNote() {
        this.storage.update(this.note.map(n => n.toJSON()));
    }
}
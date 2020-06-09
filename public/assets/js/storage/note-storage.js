'use strict';

export class NoteStorage {
    constructor() {
        
        this.notes = JSON.parse(this.getNotes(this.dataUrl));
        console.log('this.notes', this.notes[0]);
    }

    getAllNotes() {
        this.notes;
    }

    getNotes() {
        var http_req = new XMLHttpRequest();
        http_req.open("GET", 'http://localhost:3000/notes', false);
        http_req.send(null);
        return http_req.responseText;
    }

    // UPDATE NOTE
    update(dataIndex) {
        console.log('UPDATE', dataIndex);
        const Http = new XMLHttpRequest();
        const url = 'http://localhost:3000/notes/' + dataIndex;
        Http.open("GET", url);
        Http.send();

        // await localStorage.setItem(this.collection, JSON.stringify(this.notes));
        // return notes;
    }

    // ADD NOTE
    async createNote(note) {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(note),
        };
        try {
            const url = 'http://localhost:3000/notes';
            const response = await fetch(url, options);
            const note = await response.json();
            return note;
          
        } catch (err) {
          console.error('Error creating documents', err);
        }
      }

}
'use strict';

export class NoteStorage {
    constructor() {
        this.notes = JSON.parse(this.getJSONDatas(this.dataUrl));
    }

    // GET ALL NOTES
    getNotes() {
        return this.notes;
    }

    // GET ALL NOTES
    getJSONDatas() {
        var http_req = new XMLHttpRequest();
        http_req.open("GET", 'http://localhost:3000/notes', false);
        http_req.send(null);
        return http_req.responseText;
    }

    // SET STATUS
    getStatus() {
        return {
            notesTotal: this.notes.length,
            notesCompleted: this.notes.filter(a => a.complete ).length
        }
    }

    // UPDATE NOTE
    async update(noteId) {
        console.log('STORAGE update', noteId);
        const options = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify(noteId),

          };

          try {
              const url = 'http://localhost:3000/notes/' + noteId;
              const response = await fetch(url, options);
              const noteId = await response.json();
              return noteId;
            
          } catch (err) {
            console.error('Error updating document', err);
          }
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

    // ADD NOTE
    async deleteNote(note) {
        console.log('STORAGE deleteNote', note);
        const options = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        };
        try {
            const url = `http://localhost:3000/notes/${note}`;
            const response = await fetch(url, options);
            return url;
          
        } catch (err) {
          console.error('Error deleting documents', err);
        }
    }

}
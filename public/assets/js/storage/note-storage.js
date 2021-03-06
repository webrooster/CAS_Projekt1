export class NoteStorage {
    constructor() {
        this.notes = [];
    }

    async initData() {
      this.notes = await this.getAllNotes();
    }
  
    static async create() {
      const obj = new NoteStorage();
      await obj.initData();
      return obj;
    }
  
    async getAllNotes() {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      try {
        let url = 'http://localhost:3000/notes';
        const response = await fetch(url, options);
        return await response.json();
      } catch (err) {
        console.error('Error getting documents', err);
      }
    }

    // GET ALL NOTES
    getNotes() {
        return this.notes;
    }

    // SET STATUS
    getStatus() {
        return {
            notesTotal: this.notes.length,
            notesCompleted: this.notes.filter(a => a.complete ).length
        }
    }

    // UPDATE NOTE
    async update(note, noteId) {
        const options = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(note)
        };

        try {
            const url = `http://localhost:3000/notes/${noteId}`;
            const response = await fetch(url, options);
            const note = await response.json();
            return note;
          
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

    // DELETE NOTE
    async deleteNote(note) {
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
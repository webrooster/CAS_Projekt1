export class NoteStorage {
    constructor() {
        this.notes = [];
    }

    async initData() {
        this.notes = await this.getNotes();
    }

    static async create(dataService) {
        const obj = new NoteStorage();
        await obj.initData();
        console.log('create', obj);

        return obj;
    }

    // GET ALL NOTES
    async getNotes() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            let url = 'http://localhost:3000/notes';
            const awaitingNotesList = await fetch(url, options);
            const notes = await awaitingNotesList.json() || [];
            const notesClone = JSON.parse(JSON.stringify(notes));
            this.notes = notesClone;
            console.log('getNotes', this.notes);
            return this.notes;
        } catch (err) {
            console.log('notes not found');
        }
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
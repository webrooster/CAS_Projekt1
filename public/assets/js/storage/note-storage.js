export class NoteStorage {
    constructor() {
        this.collection = 'notes';
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
              'Content-Type': 'application/json',
            }
          };

          try {
              let url = 'http://localhost:3000/notes';
              const awaitingNotesList = await fetch(url, options);
              const notes = await awaitingNotesList.json() || [];
              
              this.notes = notes;
              console.log('getNotes', notes, this.notes, this.notes.length);
              return this.notes;

            } catch (err) {
                console.log('notes not found');
            }

    }

    // UPDATE NOTE
    async update(dataId) {
        const Http = new XMLHttpRequest();
        const url = `http://localhost:3000/notes/${dataId}`;
        Http.open("GET", url);
        await Http.send();

        // await localStorage.setItem(this.collection, JSON.stringify(this.notes));
        // return notes;
    }

    // ADD NOTE
    async createNote(note) {
        this.notes.push(note);
        await localStorage.setItem(this.collection, JSON.stringify(this.notes));
    }

}
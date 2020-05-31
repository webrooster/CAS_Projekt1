

export class NoteStorage {
    constructor() {
        this.collection = 'notes';
        const notes = JSON.parse(localStorage.getItem(this.collection) || '[]');
        this.notes = notes;        
        localStorage.setItem(this.collection, JSON.stringify(notes));
    }

    // GET ALL NOTES
    getNotes() {
        return this.notes;
    }

    getStatus() {
        return {
            notesTotal: this.notes.length,
            notesCompleted: this.notes.filter(a => a.complete ).length
        }
    }

    // UPDATE NOTE
    async update(notes) {
        await localStorage.setItem(this.collection, JSON.stringify(this.notes));
        return notes;
    }

    // ADD NOTE
    async createNote(note) {
        this.notes.push(note);
        await localStorage.setItem(this.collection, JSON.stringify(this.notes));
    }

}
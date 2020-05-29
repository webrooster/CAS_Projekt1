

export class NoteStorage {
    constructor() {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        this.notes = notes;
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // GET ALL NOTES
    getNotes() {
        return this.notes;
    }

    // COMPLETE NOTE
    completeNote() {        
        localStorage.setItem('notes', JSON.stringify(this.notes));  
    }

    // UPDATE NOTE
    async update(notes) {
        await localStorage.setItem('notes', JSON.stringify(this.notes));
        return notes;
    }

    // ADD NOTE
    async createNote(note) {
        this.notes.push(note);
        await localStorage.setItem('notes', JSON.stringify(this.notes));
    }

}
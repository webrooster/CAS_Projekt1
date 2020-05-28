export class NoteStorage {
    constructor() {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        this.notes = notes;
        localStorage.setItem('notes', JSON.stringify(notes));

        console.log('this.notes storage', this.notes)
    }

    // GET ALL NOTES
    getNotes() {
        return this.notes;
    }

    // UPDATE NOTE
    update(notes) {
        localStorage.setItem('notes', JSON.stringify(notes));
        return notes;
    }

    // ADD NOTE
    createNote(note) {
        this.notes.push(note);
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

}
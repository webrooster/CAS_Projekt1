export class NoteStorage {
    constructor() {
        const note = JSON.parse(localStorage.getItem('notes') || '[]');
        this.note = note;
        localStorage.setItem('notes', JSON.stringify(note));

        console.log('this.note', this.note)
    }

    // GET ALL NOTES
    getNotes() {
        return this.note;
    }

    // UPDATE NOTE
    update(note) {
        localStorage.setItem('notes', JSON.stringify(note));
        return note;
    }

}
'use strict';

// import { notesView } from "../views/view_notes";

/**
 * Represenets notes mock datas.
 */

// export const notesDatas = [
//     {
//         'title': 'Znüni Brötli parat machen',
//         'description': 'Lorem ipsum dolor sit amet ...',
//         'created_at': '12-04-2020',
//         'due_date': '16-04-2020',
//         'importance': 5,
//         'done': 0
//     },
//     {
//         'title': 'Bla bla bla',
//         'description': 'Bla bla bla bla bla bla ...',
//         'created_at': '10-03-2020',
//         'due_date': '26-03-2020',
//         'importance': 2,
//         'done': 1
//     },
//     {
//         'title': 'Noch ein Task',
//         'description': 'Eine kleine Beschreibung dazu',
//         'created_at': '09-02-2020',
//         'due_date': '06-03-2020',
//         'importance': 2,
//         'done': 1
//     },
// ]

class NotesModel {
    
    init() {
        this.getNotes();
        this.deleteNote();
        this.doneNote();
    }

    getNotes() {
        let notes;
        if (localStorage.getItem('notes') === null) {
            notes = [];
        } else {
            notes = JSON.parse(localStorage.getItem('notes'));
        }
        return notes;
    }

    addNote(note) {
        const notes = this.getNotes();
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    doneNote(noteDone) {
        const notes = this.getNotes();
        notes[noteDone.index].done = noteDone.done;
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    deleteNote(index) {
        const notes = this.getNotes();
        console.log('delete note', index)
        notes.splice(index, 1);

        localStorage.setItem('notes', JSON.stringify(notes));
    }
}

export const notesDatas = new NotesModel();
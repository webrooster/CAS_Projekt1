'use strict';

/**
 * @class NotesModel
 * Represenets notes mock datas.
 */

class NotesModel {
   
    getNotes() {
        let notes;
        if (localStorage.getItem('notes') === null) {
            notes = [];
        } else {
            notes = JSON.parse(localStorage.getItem('notes'));
        }

        return notes;
    }

    updateNote(item) {
        const notes = this.getNotes();
        const updateField = localStorage.getItem(item.title, 'A new note');
        console.log('MODEL updateField', updateField, item.index, item.title);
        notes.splice(item.index, 1, item.title);
        // localStorage.setItem('notes', JSON.stringify(notes));
    }

    addNote(item) {
        const notes = this.getNotes();
        notes.push(item);
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
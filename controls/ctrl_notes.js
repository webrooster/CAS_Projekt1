'use strict';
/**
 * @class NotesController
 * 
 * @description Controls input and output datas.
 * @param notesView
 * @param notesDatas
 * 
 */

import { notesView } from '../views/view_notes.js';
// import { notesDatas } from '../models/mock_datas.js';
import { notesDatas } from '../models/mock_datas.js';

class NotesController {
    constructor(notesView, notesDatas) {
        this.notesView = notesView;
        this.notesDatas = notesDatas;
    }

    init(){ 
        this.notesView.init(); 
    }

    getNotes() {
        return notesDatas.getNotes();   
    };
    
    addNote(note) {
        // return notesDatas.push(note);
        notesDatas.addNote(note);
    }
    
    doneNote(noteDone) {
        notesDatas.doneNote(noteDone);
        // return notesDatas[noteDone.index].done = noteDone.done;
    }

    deleteNote(index) {
        notesDatas.deleteNote(index);
        // return notesDatas.splice(index, 1);
    }
}

export const NotesApp = new NotesController(notesView, notesDatas);
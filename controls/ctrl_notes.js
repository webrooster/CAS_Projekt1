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
import { notesDatas } from '../models/model.js';

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

    updateNote(item) {
        // console.log('UPDATEFIELD CONTROLLER', item, item.index);
        notesDatas.updateNote(item);
    }
    
    addNote(item) {
        notesDatas.addNote(item);
    }
    
    doneNote(noteDone) {
        notesDatas.doneNote(noteDone);
    }

    deleteNote(index) {
        notesDatas.deleteNote(index);
    }
}

export const NotesApp = new NotesController(notesView, notesDatas);
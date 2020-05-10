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
import { notesDatas } from '../models/mock_datas.js';

class NotesController {
    constructor(notesView) {
        this.notesView = notesView;
    }

    init(){ 
        return this.notesView.init(); 
    }

    getNotes() {
        return notesDatas;   
    };
    
    addNote(note) {
        return notesDatas.push(note);
    }
    
    doneNote(noteDone) {
        return notesDatas[noteDone.index].done = noteDone.done;
    }

    deleteNote(index) {
        return notesDatas.splice(index, 1);
    }
}

export const NotesApp = new NotesController(notesView);


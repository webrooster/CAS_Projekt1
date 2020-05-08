'use strict';
/**
 * @class NotesController
 * 
 * @description Controls input and output datas.
 * @param notesview
 * @param notesDatas
 * 
 */

import { notesview } from '../views/view_notes.js';
import { notesDatas } from '../models/mock_datas.js';

class NotesController {
    constructor(notesview) {
        this.notesview = notesview;
    }

    init() {
        this.notesview.init();
    }

    getNotes() {
       return notesDatas; 
    }

    addNote() {
        console.log('ADDNOTE() -> TO BE DEFINDED AND COMPLETE');     
    }

    removeNotes() {

    }
}

export const notesctrl = new NotesController(notesview);


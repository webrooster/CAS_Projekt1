'use strict';
/**
 * 
 */

import { noteslisting } from '../layouts/notes-listing.js';
import { notesDatas } from './datas.js';

class NotesController {
    constructor(noteslisting) {
        this.noteslisting = noteslisting;
    }

    init() {
        this.noteslisting.init();
    }

    getNotes() {
       return notesDatas; 
    }

    addNote() {
        console.log('ADDNOTE() -> TO BE DEFINDED AND COMPLETE');     
    }
}

export const notesctrl = new NotesController(noteslisting);


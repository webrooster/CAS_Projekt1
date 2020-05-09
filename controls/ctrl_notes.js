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

    init = () => { 
        this.notesView.init(); 
    }

    getNotes = () => notesDatas; 

    addNote = (note) => { 
        notesDatas.push(note); 
        console.table('addNote from controller', note, notesDatas);
    }
}

export const NotesApp = new NotesController(notesView);


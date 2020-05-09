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

    getNotes = () => {
        console.table(notesDatas);
        return notesDatas;   
    };

    addNote = (note) => notesDatas.push(note);

    deleteNote = (index) => {
        console.log('index to delete', index);
        console.table(notesDatas);
        return notesDatas.splice(index, 1)
    };
}

export const NotesApp = new NotesController(notesView);


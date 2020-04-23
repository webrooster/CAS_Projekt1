'use strict';
/**
 * 
 */

import { noteslisting } from '../layouts/notes-listing.js';

const notesDatas = [
    {
        'title': 'Lorem ipsum',
        'description': 'Lorem ipsum dolor sit amet ...',
        'created_at': '12-04-2020',
        'expire': '16-04-2020',
        'importance': 5,
    },
    {
        'title': 'Bla bla bla',
        'description': 'Bla bla bla bla bla bla ...',
        'created_at': '10-03-2020',
        'expire': '26-03-2020',
        'importance': 2,
    },
]

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
}

export const notesctrl = new NotesController(noteslisting);


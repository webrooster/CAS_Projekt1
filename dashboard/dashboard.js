/**
 * 
 * 
 */

import { header, sidebar, footer } from '../layouts/index.js';
import { notesctrl } from '../components/interface.js';

class NotesView {

    init() {
        header.init();
        sidebar.init();
        footer.init();
        notesctrl.init();
    }
}

export const dashboard = new NotesView();
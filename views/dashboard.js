/**
 * @class Dashboard
 * @desc Renders site partials
 * @param header
 * @param footer
 * @notectrl
 */

import { header, footer } from './include.js';
import { NotesApp } from '../controls/include.js';

class Dashboard {

    init() {
        header.init();
        NotesApp.init();
        footer.init();
    }
}

export const dashboard = new Dashboard();
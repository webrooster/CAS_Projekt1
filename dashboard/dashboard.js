/**
 * 
 * 
 */

import { header, sidebar, footer } from '../layouts/index.js';
import { notesctrl } from '../components/interface.js';

class Dashboard {

    init() {
        header.init();
        sidebar.init();
        footer.init();
        notesctrl.init();

        console.log('DASHBOARD loaded...');            
    }
}

export const dashboard = new Dashboard();
'use strict';
/**
 * Render Header Datas 
 */

import { staticContent } from '../components/static-content.js';

class Header {

    constructor() {
        this.headerContent = this.getStaticContent();
        this.title = this.headerContent[0].title;
        this.subtitle = this.headerContent[0].subtitle;
        this.position = 'afterbegin';
    }

    init() {
        this.renderTemplate();
        this.getStaticContent();
    }

    getStaticContent() {        
        return staticContent;
    }

    renderTemplate() {       
        const $renderHeader = document.getElementById('header');
        const template = `<h1>${ this.title }</h1><p>${ this.subtitle }</p>`;
        const position = this.position;
        $renderHeader.insertAdjacentHTML(position, template);
    }
}

export const header = new Header();
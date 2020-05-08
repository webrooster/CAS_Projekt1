'use strict';
/**
 * @class Header
 * 
 * @description Render header partial.
 * 
 */

import { staticContent } from '../models/ui_content.js';

class Header {

    constructor() {
        this.headerContent = this.getStaticContent();
        this.title = this.headerContent[0].header.title;
        this.subtitle = this.headerContent[0].header.subtitle;
        this.$headerElement = document.getElementById('header');
        this.position = 'afterbegin';
    }

    init() {
        this.getStaticContent();
        this.renderTemplate();
    }

    getStaticContent() {        
        return staticContent;
    }

    renderTemplate() {       
        const $renderHeader = this.$headerElement;
        const template = `<h1>${ this.title }</h1>`;
        const position = this.position;
        $renderHeader.insertAdjacentHTML(position, template);
    }
}

export const header = new Header();
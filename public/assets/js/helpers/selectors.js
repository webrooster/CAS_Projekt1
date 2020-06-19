export const element = {

        // FORM ELEMENTS
        noteForm: document.querySelector('#note__form'),
        title: document.querySelector('#title'),
        description: document.querySelector('#description'),
        expire: document.querySelector('#expire'),
        importance: document.querySelector('#importance'),

        clear: document.querySelector('#form__clear'),
        clear_update: document.querySelector('#clear__update'),
        flip: document.querySelector('.flip-card'),
        
        // FILTER BUTTONS
        sort_createdAt: document.querySelector('#sort_createdAt'),
        sort_importance: document.querySelector('#sort_importance'),
        sort_completed: document.querySelector('#sort_completed'),
        sort_finished_date: document.querySelector('#sort_finished_date'),
        sort_clear: document.querySelector('#sort_clear'),

        // HANDLEBAR SELECTORS
        notesListContainer: document.getElementById('standard__list'),
        statusPanelContainer: document.getElementById('status__panel'),
        noteFormUpdateContainer: document.getElementById('note__form--update'),

        // THEME TOGGLER
        theme__toggler: document.querySelector('#theme__toggler'),
}

export const template = {
    // HANDLEBAR NOTE LISTING
    noteListTemplate: Handlebars.compile(document.querySelector('#notes-list-template').innerHTML),

    // HANDLEBAR STATUS PANEL
    statusPanelTemplate: Handlebars.compile(document.querySelector('#status-panel-template').innerHTML),
    
    // HANDLEBARS FORM
    noteFormUpdateTemplate: Handlebars.compile(document.querySelector('#note__form--update-template').innerHTML)   
}
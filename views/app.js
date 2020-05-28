"use strict"

import { DOM } from './views/base.js';
import Form from './models/Form.js';
import List from './models/List.js';

import * as formView from './views/formView.js';
import * as listView from './views/listView.js';

/**
 * Global state of the app
 * Form fields
 * Form values
 */

const state = {};

const controlForm = () => {

    const title = formView.getTitle()
    const description = formView.getDescription()
    const expireAt = formView.getExpireDate()
    const importance = formView.getImportance()
    // const createdAt = formView.getCreatedAt()
    
    state.form = new Form(title, description, expireAt, importance)

    state.form.formValidation()

    console.log('state.form validation', state.form)
};

/**
 * RENDER NOTES LIST
 */
const renderNotesList = () => {
    state.list = new List()
    const notes = state.list.getNotesList()
    listView.renderList(notes)
};

document.addEventListener('DOMContentLoaded', () => {
    renderNotesList()
});

/**
 * SORT LIST BY CREATED AT
 */
DOM.sort_createdAt.addEventListener('click', e => {
    console.log('SORT CREATED AT CLICKED')
    DOM.sort_createdAt.classList.toggle('active')
});

/**
 * SORT LIST BY IMPORTANCE
 */
DOM.sort_importance.addEventListener('click', e => {
    console.log('SORT IMPORTANCE CLICKED')
    DOM.sort_importance.classList.toggle('active')
});

/**
 * SORT LIST BY FINISHED DATE
 */
DOM.sort_finished_date.addEventListener('click', e => {
    console.log('SORT IMPORTANCE CLICKED')
    DOM.sort_finished_date.classList.toggle('active')
});

/**
 * SORT LIST BY FINISHED
 */
DOM.sort_finished.addEventListener('click', e => {
    console.log('SORT FINISHED CLICKED')
    DOM.sort_finished.classList.toggle('active')
});

/**
 * CHECK FORM 
*/
DOM.submit.addEventListener('click', e => {
    e.preventDefault()
    controlForm()
});

/**
 * RESET THE FORM
*/
DOM.reset.addEventListener('click', e => {
    DOM.noteform.reset()
});

/**
 * THEME TOGGLER
 */
document.addEventListener("DOMContentLoaded", function (e) {
    var _selector = DOM.theme__toggler
    _selector.addEventListener('click', () => {
        document.body.classList.toggle('theme__dark')
    })
});

/**
 * NOTE LIST ITEM EDIT
 */
DOM.standard__list.addEventListener('click', e => {
    if (e.target.classList[0] == 'edit') {
        const dataIndex = e.target.parentElement.parentElement.parentElement.getAttribute('data-index');
        console.log('dataIndex edit', e.target, dataIndex)

    } else if (e.target.classList[1] == 'fa-edit') {
        const dataIndex = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-index');
        console.log('dataIndex fa-edit', e.target, dataIndex)

    }
});

/**
 * NOTE LIST ITEM COMPLETE
 */
DOM.standard__list.addEventListener('click', e => {
    if (e.target.classList[1] == 'btn--completed') {
        // const dataIndex = e.target.parentElement.parentElement.parentElement.getAttribute('data-index');
        console.log('dataIndex btn-completed', e.target)

    } else if (e.target.classList[1] == 'fa-check-circle') {
        // const dataIndex = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-index');
        console.log('dataIndex fa-check-circle', e.target)

    }
});
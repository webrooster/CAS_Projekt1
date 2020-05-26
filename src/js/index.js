import { DOM } from './views/base';
import Form from './models/Form';
import * as formView from './views/formView';
import { log } from 'util';

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
    
    state.form = new Form(title, description, expireAt, importance)

    console.log('state.form validation', state.form.formValidation())

};

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
    DOM.noteform.reset();    
    console.log('form resetted')    
})

/**
 * Theme toggler
 */
document.addEventListener("DOMContentLoaded", function (event) {
    var _selector = DOM.theme__toggler
    _selector.addEventListener('click', () => {
        document.body.classList.toggle('theme__dark');
    });
});

/**
 * Notes list: edit note event listener
 */
DOM.standard__list.addEventListener('click', e => {
    if (event.target.classList[0] == 'edit') {
        const dataIndex = event.target.parentElement.parentElement.parentElement.getAttribute('data-index');
        console.log('dataIndex edit', e.target, dataIndex);

    } else if (event.target.classList[1] == 'fa-edit') {
        const dataIndex = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-index');
        console.log('dataIndex fa-edit', e.target, dataIndex);

    }
}); 





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

    /**
     * Form field title
     * @type string
     */
    const title = formView.getTitle()
    const description = formView.getDescription()
    const expireAt = formView.getExpireDate()
    const importance = formView.getImportance()
    
    state.form = new Form(title, description, expireAt, importance)

    state.form.formValidation();

};

DOM.submit.addEventListener('click', e => {
    e.preventDefault();
    controlForm();
});







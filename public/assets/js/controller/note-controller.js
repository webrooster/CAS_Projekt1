export class NoteController {
    constructor(noteService) {
        this.noteService = noteService;

        // HANDLEBAR TEMPATES
        this.noteListTemplate = Handlebars.compile(document.getElementById('notes-list-template').innerHTML);

        // DOM-ELEMENTS
        this.notesListContainter = document.getElementById('standard__list');
        this.theme__toggler = document.querySelector('#theme__toggler');
        
        // FORM ELEMENTS
        this.noteForm = document.querySelector('#note__form');
        this.title = document.querySelector('#title');
        this.description = document.querySelector('#description');
        this.expire = document.querySelector('#expire');
        this.importance = document.querySelector('#importance');
        this.submitForm = document.querySelector('#submit');
        this.clear = document.querySelector('#clear');

        // FILTER BUTTONS
        this.sort_createdAt = document.querySelector('#sort_createdAt');
        this.sort_importance = document.querySelector('#sort_importance');
        this.sort_finished = document.querySelector('#sort_finished');
        this.sort_finished_date = document.querySelector('#sort_finished_date');

    }

    // INIT EVENTHANDLERS
    initEventHandlers() {

        /**
         * NOTE LIST ITEM EDIT
         */
        this.notesListContainter.addEventListener('click', e => {
            if (e.target.classList[0] == 'edit') {
                const dataId = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
                console.log('dataId edit', e.target, dataId)

            } else if (e.target.classList[1] == 'fa-edit') {
                const dataId = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-id');
                console.log('dataId fa-edit', e.target, dataId)

            }
        });

        /**
         * NOTE LIST COMPLETE NOTE
         */
        this.notesListContainter.addEventListener('click', e => {
            if (e.target.classList[1] == 'btn--completed') {
                const dataIndex = e.target.parentElement.parentElement.parentElement.getAttribute('data-index');
                const dataId = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
                console.log('dataId edit', e.target, dataId, dataIndex);

                this.noteService.completeNote(dataIndex, dataId);
                
            } else if (e.target.classList[1] == 'fa-check-circle') {
                const dataIndex = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-index');
                const dataId = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-id');
                console.log('dataId fa-edit', e.target, dataId, dataIndex);
                
                this.noteService.completeNote(dataIndex, dataId);
            }

            this.renderNotes();

        });


        // NOTE FORM
        this.submitForm.addEventListener('click', event => {
            event.preventDefault();

            const title = this.title.value;
            const description = this.description.value;
            const expire = this.expire.value;
            const importance = parseInt(this.importance.value);

            console.log('SUBMIT CLICKED', event.type, 'FORM DATAS', title, description, expire, importance);

            let formStatus = false;

            // FORM VALIDATION - SEND WHEN IMPORTANCE IS NUMBER AND SET
            if (title !== '' && expire !== '' && Number.isInteger(importance)) formStatus = true, this.noteForm.classList.remove('error');
            console.log('formStatus', formStatus);            

            if (formStatus === true) {
                const datas = {
                    id: null, 
                    title: title, 
                    description: description, 
                    expire: expire, 
                    importance: importance, 
                    complete: 0, 
                    completed_at: ''
                }

                this.noteService.addNote(datas);
                this.renderNotes();
                this.resetForm();

            } else {
                this.noteForm.classList.add('error');
            }

        });

        // FORM CLEAR
        this.clear.addEventListener('click', event => {
            this.resetForm();   
        });


        // FILTER BUTTONS
        this.sort_createdAt.addEventListener('click', event => {
            console.log('sort_createdAt', event.target);            
        });

        this.sort_importance.addEventListener('click', event => {
            console.log('sort_importance', event.target);            
        });

        this.sort_finished.addEventListener('click', event => {
            console.log('sort_finished', event.target);            
        });

        this.sort_finished_date.addEventListener('click', event => {
            console.log('sort_finished_date', event.target);            
        });


        // THEME TOGGLER
        this.theme__toggler.addEventListener('click', event => {
            document.body.classList.toggle('theme__dark');            
        });

    }

    // RESET FORM
    resetForm() {
        this.clear.click();
        this.importance.selectedIndex = null;
        this.noteForm.classList.remove('error');
    }

    // RENDER NOTES LIST
    renderNotes() {
        this.notesListContainter.innerHTML = '';
        this.notesListContainter.innerHTML = this.noteListTemplate({ notes: this.noteService.notes });
    }

    // INIT APP
    noteAction() {
        this.initEventHandlers();
        this.noteService.loadData();
        this.renderNotes();
    }
}
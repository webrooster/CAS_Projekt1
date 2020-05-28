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
                const dataIndex = e.target.parentElement.parentElement.parentElement.getAttribute('data-index');
                console.log('dataIndex edit', e.target, dataIndex)

            } else if (e.target.classList[1] == 'fa-edit') {
                const dataIndex = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-index');
                console.log('dataIndex fa-edit', e.target, dataIndex)

            }
        });

        /**
         * NOTE LIST COMPLETE NOTE
         */
        this.notesListContainter.addEventListener('click', e => {
            if (e.target.classList[1] == 'btn--completed') {
                const dataIndex = e.target.parentElement.parentElement.parentElement.getAttribute('data-index');
                console.log('dataIndex edit', e.target, dataIndex)

            } else if (e.target.classList[1] == 'fa-check-circle') {
                const dataIndex = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-index');
                console.log('dataIndex fa-edit', e.target, dataIndex)

            }
        });


        // NOTE FORM
        this.submitForm.addEventListener('click', event => {
            event.preventDefault();

            const title = this.title.value;
            const description = this.description.value;
            const expire = this.expire.value;
            const importance = this.importance.value;
            console.log('SUBMIT CLICKED', event.type, 'FORM DATAS', title, description, expire, importance);

            const datas = {
                id: null, 
                title: title, 
                description: description, 
                expire: expire, 
                importance: importance, 
                complete: false, 
                completed_at: '' }

            this.noteService.addNote(datas);
            this.renderNotes();
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

        this.theme__toggler.addEventListener('click', event => {
            document.body.classList.toggle('theme__dark');            
        });

    }

    // RENDER NOTES LIST
    renderNotes() {
        this.notesListContainter.innerHTML = this.noteListTemplate({ notes: this.noteService.notes });
    }

    // INIT APP
    noteAction() {
        this.initEventHandlers();
        this.noteService.loadData();
        this.renderNotes();
    }
}
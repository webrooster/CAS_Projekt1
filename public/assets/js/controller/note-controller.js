export class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
        this.loading = false;

        // HANDLEBAR TEMPATES
        this.noteListTemplate = Handlebars.compile(document.querySelector('#notes-list-template').innerHTML);
        this.statusPanelTemplate = Handlebars.compile(document.querySelector('#status-panel-template').innerHTML);

        // DOM-ELEMENTS
        this.notesListContainter = document.getElementById('standard__list');
        this.statusPanel = document.getElementById('status__panel');

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
        this.sort_completed = document.querySelector('#sort_completed');
        this.sort_finished_date = document.querySelector('#sort_finished_date');
    }

    // INIT EVENTHANDLERS
    initEventHandlers() {

        /**
         * NOTE LIST ITEM EDIT
         */
        this.notesListContainter.addEventListener('click', e => {
            if (e.target.matches('.edit')) {
                const dataId = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
                console.log('dataId edit', e.target, dataId);
            }
        });

        /**
         * NOTE LIST COMPLETE NOTE
         */
        this.notesListContainter.addEventListener('click', event => {
            if (event.target.matches('.btn--complete')) {
                event.preventDefault();
                const dataIndex = event.target.parentElement.parentElement.parentElement.getAttribute('data-index');
                const dataId = event.target.parentElement.parentElement.parentElement.getAttribute('data-id');                
                this.noteService.completeNote(dataIndex, dataId);
                this.renderNotes();
            }
        });

        // NOTE FORM
        this.submitForm.addEventListener('click', event => {
            event.preventDefault();

            const title = this.title.value;
            const description = this.description.value;
            const expire = this.expire.value;
            const importance = parseInt(this.importance.value);

            // console.log('SUBMIT CLICKED', event.type, 'FORM DATAS', title, description, expire, importance);

            let formStatus = false;

            // FORM VALIDATION - SEND WHEN IMPORTANCE IS NUMBER AND SET
            if (title !== '' && expire !== '' && Number.isInteger(importance)) formStatus = true, this.noteForm.classList.remove('error');          

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
            this.sort_createdAt.classList.toggle('active');
            this.noteService.sortCreatedAt(this.getFilterState(this.sort_createdAt));
            this.renderNotes();      
        });

        this.sort_importance.addEventListener('click', event => {
            console.log('sort_importance', event.target);
            this.sort_importance.classList.toggle('active'); 
            this.noteService.sortImportance(this.getFilterState(this.sort_importance));
            this.renderNotes();           
        });

        this.sort_completed.addEventListener('click', event => {
            this.sort_completed.classList.toggle('active');
            this.noteService.sortCompleted(this.getFilterState(this.sort_completed));
            this.renderNotes();          
        });
        
        this.sort_finished_date.addEventListener('click', event => {
            console.log('sort_finished_date', event.target);            
            this.sort_finished_date.classList.toggle('active');
            this.noteService.sortFinishedAt(this.getFilterState(this.sort_finished_date));
            this.renderNotes();
        });

        // UI ELEMENTS 

        // OPEN LIST ITEM
        this.notesListContainter.addEventListener('click', event => {
            event.preventDefault();
            if (event.target.matches('.btn')) {
                const dropDownId = event.target.parentElement.parentElement.nextElementSibling.getAttribute('id');
                const openDropdownId = document.getElementById(dropDownId);
                openDropdownId.classList.toggle('note--open');
                const currentButtonId = event.target.id;
                const activeButton = document.getElementById(currentButtonId);
                activeButton.classList.toggle('active');
            }    
        });
        
        // THEME TOGGLER
        this.theme__toggler.addEventListener('click', event => {
            document.body.classList.toggle('theme__dark');            
        });
    }

    // FILTER BUTTON STATE
    getFilterState(button) {
        return button.classList.contains('active');
    }

    // RESET FORM
    resetForm() {
        this.clear.click();
        this.importance.selectedIndex = null;
        this.noteForm.classList.remove('error');
    }

    // RENDER NOTES LIST
    renderNotes = async () => {
        this.notesListContainter.innerHTML = '';        
        this.loadData = true;
        
        this.statusPanel.innerHTML = this.statusPanelTemplate({ status: this.noteService.notes.length, completed: this.noteService.notes.complete });
        this.notesListContainter.innerHTML = await this.noteListTemplate({ notes: this.noteService.notes, loading: this.loading });
    }


    // INIT APP
    noteAction() {
        this.initEventHandlers();
        this.noteService.loadData();
        this.renderNotes();
    }
}
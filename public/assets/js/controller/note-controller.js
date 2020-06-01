export class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
        this.loading = false;

        // HANDLEBAR NOTES LISTING
        this.noteListTemplate = Handlebars.compile(document.querySelector('#notes-list-template').innerHTML);
        this.notesListContainer = document.getElementById('standard__list');

        // HANDLEBAR STATUS PANEL
        this.statusPanelTemplate = Handlebars.compile(document.querySelector('#status-panel-template').innerHTML);
        this.statusPanelContainer = document.getElementById('status__panel');
        
        // HANDLEBARS FORM
        this.noteFormUpdateContainer = document.getElementById('note__form--update');
        this.noteFormUpdateTemplate = Handlebars.compile(document.querySelector('#note__form--update-template').innerHTML);

        
        // FORM ELEMENTS
        this.noteForm = document.querySelector('#note__form');
        this.title = document.querySelector('#title');
        this.description = document.querySelector('#description');
        this.expire = document.querySelector('#expire');
        this.importance = document.querySelector('#importance');
        this.submitForm = document.querySelector('#submit');
        this.clear = document.querySelector('#clear');
        this.clear_update = document.querySelector('#clear__update');
        
        // FILTER BUTTONS
        this.sort_createdAt = document.querySelector('#sort_createdAt');
        this.sort_importance = document.querySelector('#sort_importance');
        this.sort_completed = document.querySelector('#sort_completed');
        this.sort_finished_date = document.querySelector('#sort_finished_date');
        this.sort_clear = document.querySelector('#sort_clear');
        
        // THEME TOGGLER
        this.theme__toggler = document.querySelector('#theme__toggler');

        // FLIP FORM
        this.flip = document.querySelector('.flip-card');

        Handlebars.registerHelper('selected', function(importance, number) {
            return importance == number  ? ' selected' : '';
        });
    }

    // INIT EVENTHANDLERS
    initEventHandlers() {

        /**
         * DELETE ITEM
         */
        this.notesListContainer.addEventListener('click', e => {
            if (e.target.matches('.btn--delete')) {
                const dataIndex = event.target.parentElement.parentElement.parentElement.getAttribute('data-index');
                const dataId = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
                console.log('dataId delete', e.target, dataId, dataIndex);
                this.noteService.deleteNote(dataIndex, dataId);
                this.renderNotes();
            }
        });
        
        /**
         * NOTE LIST ITEM EDIT
         */
        this.notesListContainer.addEventListener('click', e => {
            e.preventDefault();
            
            if (e.target.matches('.btn--edit')) {
                const dataIndex = event.target.parentElement.parentElement.parentElement.getAttribute('data-index');
                const dataId = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
                const note = this.noteService.getNoteDatas(dataIndex, dataId);
                console.log('dataId edit', e.target, dataId, 'updateThisNote', note);
                this.flip.classList.add('active');
                this.renderNotes(note);
            }
        });
        
        /**
         * NOTE LIST COMPLETE NOTE
         */
        this.notesListContainer.addEventListener('click', event => {
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
                    completed_at: null
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
            console.log('form clear');
            this.resetForm();   
        });

        // FORM UPDATE
        this.noteFormUpdateContainer.addEventListener('click', event => {
            
            if (event.target.matches('#submit__update')) {
                event.preventDefault();
                
                const title = document.querySelector('#title__update').value;
                const description = document.querySelector('#description__update').value;
                const expire = document.querySelector('#expire__update').value;
                const importance = parseInt(document.querySelector('#importance__update').value);
                const noteId = document.querySelector('#note__updateId').value;
                const dataIndex = document.querySelector('#note__updateIndex').value;
                
                let formStatus = false;
                
                if (title !== '' && expire !== '' && Number.isInteger(importance)) formStatus = true, this.noteFormUpdateContainer.classList.remove('error');
                
                if (formStatus === true) {
                    console.log('SUBMIT UPDATE CLICKED', event.target, 'FORM DATAS', dataIndex, noteId, title, description, expire, importance);

                    const datas = {
                        title: title, 
                        description: description, 
                        expire: expire, 
                        importance: importance,
                        noteId: noteId,
                        noteIndex: dataIndex 
                    }
                    
                    this.noteService.updateNote(datas);
                    this.renderNotes();

                } else {
                    this.noteFormUpdateContainer.classList.add('error');
                }                
            }
            
            if (event.target.matches('#clear__update')) {
                console.log('update cancel clicked');
                this.flip.classList.toggle('active');
            }
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
        this.notesListContainer.addEventListener('click', event => {
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

        // CLEAR FILTER
        this.sort_clear.addEventListener('click', event => {
            this.noteService.loadData();
            this.renderNotes();
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
    renderNotes(note) {

        // CLEAR LIST
        this.notesListContainer.innerHTML = '';        
        
        // this.loading = true; LOADING SPINNER TBD
        
        // RENDER FORM UPDATE        
        if (note) {
            console.log('RENDER NOTES', note.noteDatas, note.dataId);
            this.noteFormUpdateContainer.innerHTML = this.noteFormUpdateTemplate({ 
                title: note.noteDatas.title,
                description: note.noteDatas.description,
                expire: note.noteDatas.expire,
                importance: note.noteDatas.importance,
                noteId: note.noteDatas.id,
                dataIndex: note.dataId
            });
        }
        
        // RENDER NOTES LIST
        this.notesListContainer.innerHTML = this.noteListTemplate({ 
            notes: this.noteService.notes, 
            loading: this.loading 
        });

        // RENDER STATUS PANEL
        this.statusPanelContainer.innerHTML = this.statusPanelTemplate({ 
            status: this.noteService.statusPanel().notesTotal, 
            completed: this.noteService.statusPanel().notesCompleted
        });

        // RELOADING DATAS
        this.noteService.loadData();
    }


    // INIT APP
    noteAction() {
        this.initEventHandlers();
        this.noteService.loadData();
        this.noteService.statusPanel();
        this.renderNotes();
    }
}
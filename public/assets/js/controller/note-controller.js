'use strict';

export class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
        this.loading = false;
        this.message = 'List is empty! Be the first and add a note!';

        // HANDLEBAR NOTES LISTING
        this.noteListTemplate = Handlebars.compile(document.querySelector('#notes-list-template').innerHTML);
        this.notesListContainer = document.getElementById('standard__list');

        // HANDLEBAR STATUS PANEL
        this.statusPanelTemplate = Handlebars.compile(document.querySelector('#status-panel-template').innerHTML);
        this.statusPanelContainer = document.getElementById('status__panel');
        
        // HANDLEBARS FORM
        this.noteFormUpdateTemplate = Handlebars.compile(document.querySelector('#note__form--update-template').innerHTML);
        this.noteFormUpdateContainer = document.getElementById('note__form--update');
        
        // FORM ELEMENTS
        this.noteForm = document.querySelector('#note__form');
        this.title = document.querySelector('#title');
        this.description = document.querySelector('#description');
        this.expire = document.querySelector('#expire');
        this.importance = document.querySelector('#importance');

        this.clear = document.querySelector('#form__clear');
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

        // HANDLEBAR HELPER - CONVERT CREATED DATE
        Handlebars.registerHelper('formatTime', (created) => {
            return new Date(created).toLocaleString('en-US');
        });

        // HANDLEBAR HELPER - CONVERT COMPLETED_AT
        Handlebars.registerHelper('formatTime', (completed_at) => {
            return new Date(completed_at).toLocaleString('en-US');
        });

        // HANDLEBAR HELPER - CONVERT EXPIRE DATE
        Handlebars.registerHelper('formatExpire', (expire) => {
            const expireLocalTime = expire.toLocaleString('en-US');
            return new Date(expireLocalTime).toLocaleDateString('en-US');
        });
    }

    // INIT EVENTHANDLERS
    initEventHandlers() {

        /**
         * NOTES LIST ACTIONS
         */
        this.notesListContainer.addEventListener('click', e => {
            e.preventDefault();

            /**
             * DELETE NOTE
             */
            if (e.target.matches('.btn--delete')) {
                this.noteService.deleteNote(this.getNoteIndex().dataIndex, this.getNoteIndex().dataId);
                this.renderNotes();
            }

            /**
             * EDIT NOTE
             */
            if (e.target.matches('.btn--edit')) {
                const note = this.noteService.getNoteDatas(this.getNoteIndex().dataIndex, this.getNoteIndex().dataId);
                this.noteEditId = this.getNoteIndex().dataId;
                this.flip.classList.add('active');
                this.renderNotes(note);
            }

            /**
             * COMPLETE NOTE
             */
            if (event.target.matches('.btn--complete')) {         
                this.noteService.completeNote(this.getNoteIndex().dataIndex, this.getNoteIndex().dataId);
                this.renderNotes();
            }
            /**
             * OPEN NOTE DETAILS
             */
            if (event.target.matches('.btn--open')) {
                const dropDownId = event.target.parentElement.parentElement.nextElementSibling.getAttribute('id');
                const openDropdownId = document.getElementById(dropDownId);
                openDropdownId.classList.toggle('note--open');
                const currentButtonId = event.target.id;
                const activeButton = document.getElementById(currentButtonId);
                activeButton.classList.toggle('active');
            }  
        });
        
        // ON KEYPRESS REMOVE ERROR CLASS
        document.addEventListener('keydown', event => {
            this.noteForm.classList.remove('error');
            this.noteFormUpdateContainer.classList.remove('error');
        });

        // NOTE FORM
        this.noteForm.addEventListener('click', event => {

            if (event.target.matches('#form__submit')) {
                event.preventDefault();

                const title = this.title.value;
                const description = this.description.value;
                const expire =  this.expire.value;
                const importance = parseInt(this.importance.value);

                console.log('CONTROLLER expire', expire)

                let formStatus = false;

                // FORM VALIDATION - SEND WHEN IMPORTANCE IS NUMBER AND SET
                if (title !== '' && expire !== '' && Number.isInteger(importance)) formStatus = true, this.noteForm.classList.remove('error');          

                if (formStatus === true) {
                    const datas = {
                        // id: null, 
                        title: title, 
                        description: description, 
                        expire: expire, 
                        importance: importance, 
                        complete: 0, 
                        completed_at: null
                    }

                    this.noteService.addNote(datas).then(() => {
                      this.renderNotes();
                      this.resetForm();
                    });
                    

                } else {
                    this.noteForm.classList.add('error');
                }
            }

            if (event.target.matches('#form__clear')) {
                this.resetForm();
            }

        });

        // FORM UPDATE
        this.noteFormUpdateContainer.addEventListener('click', event => {
            
            if (event.target.matches('#submit__update')) {
                event.preventDefault();

                const title = document.querySelector('#title__update').value;
                const description = document.querySelector('#description__update').value;
                const expire = document.querySelector('#expire__update').value;
                const importance = parseInt(document.querySelector('#importance__update').value);
                const noteId = document.querySelector('#note__updateId').value = this.noteEditId;
                const dataIndex = document.querySelector('#note__updateIndex').value;
                                
                let formStatus = false;
                
                if (title !== '' && expire !== '' && Number.isInteger(importance)) formStatus = true, this.noteFormUpdateContainer.classList.remove('error');
                
                if (formStatus === true) {
                    const datas = {
                        title: title, 
                        description: description, 
                        expire: expire, 
                        importance: importance,
                        noteIndex: dataIndex
                    };

                    const dataId = {
                        noteId: noteId
                    }
                    
                    console.log('UPDATE FORM', datas);
                    
                    this.noteService.updateNote(datas, noteId).then(() => {
                      this.renderNotes();
                    });
                } else {
                    this.noteFormUpdateContainer.classList.add('error');
                }                
            }
            
            if (event.target.matches('#clear__update')) {
                this.flip.classList.toggle('active');
            }
        });

        // FILTER BUTTONS
        this.sort_createdAt.addEventListener('click', event => {
            this.sort_createdAt.classList.toggle('active');
            this.noteService.sortCreatedAt(this.getFilterState(this.sort_createdAt));
            this.renderNotes();      
        });

        this.sort_importance.addEventListener('click', event => {
            this.sort_importance.classList.toggle('active'); 
            this.noteService.sortImportance(this.getFilterState(this.sort_importance));
            this.renderNotes();           
        });

        this.sort_completed.addEventListener('click', event => {
            this.sort_completed.classList.toggle('active');
            this.noteService.sortCompleted(this.getFilterState(this.sort_completed));

            if (this.noteService.notes.length === 0) this.message = 'List must have at least one finished note!';
            this.renderNotes();          
        });
        
        this.sort_finished_date.addEventListener('click', event => {   
            this.sort_finished_date.classList.toggle('active');
            this.noteService.sortExpire(this.getFilterState(this.sort_finished_date));
            
            this.renderNotes();
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

    getNoteIndex() {
        const dataIndex = event.target.parentElement.parentElement.parentElement.getAttribute('data-index');
        const dataId = event.target.parentElement.parentElement.parentElement.getAttribute('data-id');

        return {
            dataIndex,
            dataId
        }
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

    // NOTE EXPIRE TODAY
    noteExpireToday() {
        const notesExpireToday = this.noteService.expireToday();

        notesExpireToday.forEach(note => {
            const todaysNote = document.querySelector(`[data-id='${note._id}']`);
            if (todaysNote) todaysNote.classList.toggle('today');
        });
    }

    // RENDER NOTES LIST
    renderNotes(note) {

        // CLEAR LIST
        this.notesListContainer.innerHTML = '';        
        
        // this.loading = true; LOADING SPINNER TBD
        
        // RENDER FORM UPDATE        
        if (note) {
            this.noteFormUpdateContainer.innerHTML = this.noteFormUpdateTemplate({ 
                title: note.noteDatas.title,
                description: note.noteDatas.description,
                expire: note.noteDatas.expire,
                importance: note.noteDatas.importance,
                noteId: note.noteDatas.id,
                dataIndex: note.dataId
            });

            this.noteService.loadData();

        }
        
        // RENDER NOTES LIST
        // console.log('message', this.noteService.notes.length, this.message);

        
        /**
         * NOTES LISTING
         */
        this.notesListContainer.innerHTML = this.noteListTemplate({ 
            notes: this.noteService.notes, 
            loading: this.loading,
            message: this.message
        });
        
        /**
         * STATUS PANEL
         */
        this.statusPanelContainer.innerHTML = this.statusPanelTemplate({ 
            status: this.noteService.statusPanel().notesTotal, 
            completed: this.noteService.statusPanel().notesCompleted,
            dateToday: this.currentDate()
        });
        
        /**
         * RELOADING DATAS AND PAGE
         */
        this.noteExpireToday();
        if (this.noteService.notes.length === 0) this.message;
    }

    /**
     * STATUS PANEL CURRENT DATE
     */
    currentDate() {
        let dateToday = new Date();
        let today = dateToday.toLocaleString('de-DE', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        return `${ today }`;
    }


    // INIT APP
    noteAction() {
        this.initEventHandlers();
        this.noteService.loadData();
        this.noteService.statusPanel();
        this.renderNotes();
    }
}
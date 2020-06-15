import * as helper from '../helpers/helper.functions.js';
import { element, template } from '../helpers/selectors.js';
import * as hbs_helpers from '../helpers/handlebar.helpers.js';

export class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
        this.loading = false;
        this.message = 'List is empty! Be the first and add a note!';
    }

    // INIT EVENTHANDLERS
    initEventHandlers() {

        /**
         * NOTES LIST ACTIONS
         */
        element.notesListContainer.addEventListener('click', e => {
            e.preventDefault();

            /**
             * DELETE NOTE
             */
            if (e.target.matches('.btn--delete')) {
                this.noteService.deleteNote(helper.getNoteIndex().dataIndex, helper.getNoteIndex().dataId);
                this.renderNotes();
            }

            /**
             * EDIT NOTE
             */
            if (e.target.matches('.btn--edit')) {
                const note = this.noteService.getNoteDatas(helper.getNoteIndex().dataIndex, helper.getNoteIndex().dataId);
                this.noteEditId = helper.getNoteIndex().dataId;
                element.flip.classList.add('active');
                this.renderNotes(note);
            }

            /**
             * COMPLETE NOTE
             */
            if (event.target.matches('.btn--complete')) {         
                this.noteService.completeNote(helper.getNoteIndex().dataIndex, helper.getNoteIndex().dataId);
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
            element.noteForm.classList.remove('error');
            element.noteFormUpdateContainer.classList.remove('error');
        });

        // NOTE FORM
        element.noteForm.addEventListener('click', event => {

            if (event.target.matches('#form__submit')) {
                event.preventDefault();

                const title = element.title.value;
                const description = element.description.value;
                const expire =  element.expire.value;
                const importance = parseInt(element.importance.value);

                let formStatus = false;
                console.log('validate expire', /(0?[1-9]|1[012])[\/\-]\d{4}/.test(expire))

                // FORM VALIDATION - SEND WHEN IMPORTANCE IS NUMBER AND SET
                if (title !== '' && /\d{4}\-\d{2,2}\-\d{2,2}/.test(expire) && Number.isInteger(importance)) formStatus = true, element.noteForm.classList.remove('error');          

                if (formStatus === true) {
                    const datas = {
                        title: title, 
                        description: description, 
                        expire: expire, 
                        importance: importance, 
                        complete: 0, 
                        completed_at: null
                    }

                    this.noteService.addNote(datas).then(() => {
                      this.renderNotes();
                      helper.resetForm();
                    });
                    

                } else {
                    element.noteForm.classList.add('error');
                }
            }

            if (event.target.matches('#form__clear')) {
                helper.resetForm();
            }

        });

        // FORM UPDATE
        element.noteFormUpdateContainer.addEventListener('click', event => {
            
            if (event.target.matches('#submit__update')) {
                event.preventDefault();

                const title = document.querySelector('#title__update').value;
                const description = document.querySelector('#description__update').value;
                const expire = document.querySelector('#expire__update').value;
                const importance = parseInt(document.querySelector('#importance__update').value);
                const noteId = document.querySelector('#note__updateId').value = this.noteEditId;
                const dataIndex = document.querySelector('#note__updateIndex').value;
                                
                let formStatus = false;
                
                if (title !== '' && /\d{4}\-\d{2,2}\-\d{2,2}/.test(expire) && Number.isInteger(importance)) formStatus = true, element.noteFormUpdateContainer.classList.remove('error');
                
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
                    
                    this.noteService.updateNote(datas, noteId).then(() => {
                      this.renderNotes();
                    });
                } else {
                    element.noteFormUpdateContainer.classList.add('error');
                }                
            }
            
            if (event.target.matches('#clear__update')) {
                element.flip.classList.toggle('active');
            }
        });

        // FILTER BUTTONS
        element.sort_createdAt.addEventListener('click', event => {
            element.sort_createdAt.classList.toggle('active');
            this.noteService.sortCreatedAt(helper.getFilterState(element.sort_createdAt));
            this.renderNotes();      
        });

        element.sort_importance.addEventListener('click', event => {
            element.sort_importance.classList.toggle('active'); 
            this.noteService.sortImportance(helper.getFilterState(element.sort_importance));
            this.renderNotes();           
        });

        element.sort_completed.addEventListener('click', event => {
            element.sort_completed.classList.toggle('active');
            this.noteService.sortCompleted(helper.getFilterState(element.sort_completed));

            if (this.noteService.notes.length === 0) this.message = 'List must have at least one finished note!';
            this.renderNotes();          
        });
        
        element.sort_finished_date.addEventListener('click', event => {   
            element.sort_finished_date.classList.toggle('active');
            this.noteService.sortExpire(helper.getFilterState(element.sort_finished_date));
            
            this.renderNotes();
        });
        
        // THEME TOGGLER
        element.theme__toggler.addEventListener('click', event => {
            document.body.classList.toggle('theme__dark');            
        });

        // CLEAR FILTER
        element.sort_clear.addEventListener('click', event => {
            this.noteService.loadData();
            this.renderNotes();
        });
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
        element.notesListContainer.innerHTML = '';        
        
        // this.loading = true; LOADING SPINNER TBD
        
        // RENDER FORM UPDATE        
        if (note) {
            element.noteFormUpdateContainer.innerHTML = template.noteFormUpdateTemplate({ 
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
        element.notesListContainer.innerHTML = template.noteListTemplate({ 
            notes: this.noteService.notes, 
            loading: this.loading,
            message: this.message
        });
        
        /**
         * STATUS PANEL
         */
        element.statusPanelContainer.innerHTML = template.statusPanelTemplate({ 
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
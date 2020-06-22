import * as helper from '../helpers/helper.functions.js';
import { element, template } from '../helpers/selectors.js';
import * as hbs_helpers from '../helpers/handlebar.helpers.js';

export class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
        this.message = 'List is empty! Be the first and add a note!';
        this.sorting = 'expire';
    }

    // INIT EVENTHANDLERS
    initEventHandlers() {

        // NOTES LISTING - EVENTS
        element.notesListContainer.addEventListener('click', e => {
            e.preventDefault();

            // DELETE NOTE
            if (e.target.matches('.btn--delete')) {
                this.noteService.deleteNote(helper.getNoteIndex().dataIndex, helper.getNoteIndex().dataId);
                element.sort_clear.click();
                this.renderNotes();
            }

            // EDIT NOTE
            if (e.target.matches('.btn--edit')) {
                const note = this.noteService.getNoteDatas(helper.getNoteIndex().dataIndex, helper.getNoteIndex().dataId);
                this.noteEditId = helper.getNoteIndex().dataId;
                element.flip.classList.add(helper.activeClass);
                this.renderNotes(note);
            }

            // COMPLETE NOTE
            if (e.target.matches('.btn--complete')) {         
                this.noteService.completeNote(helper.getNoteIndex().dataIndex, helper.getNoteIndex().dataId);
                this.renderNotes();
                element.sort_clear.click();
            }
            
            // OPEN DESCRIPTION
            if (e.target.matches('.btn--open')) {
                const dropDownId = e.target.parentElement.parentElement.nextElementSibling.getAttribute('id');
                const openDropdownId = document.getElementById(dropDownId);
                openDropdownId.classList.toggle('note--open');
                const currentButtonId = e.target.id;
                const activeButton = document.getElementById(currentButtonId);
                activeButton.classList.toggle(helper.activeClass);
            }  
        });
        
        // ON KEYPRESS REMOVE ERROR CLASS
        document.addEventListener('keydown', e => {
            element.noteForm.classList.remove(helper.errorclass);
            element.noteFormUpdateContainer.classList.remove(helper.errorclass);
        });

        // NOTE FORM
        element.noteForm.addEventListener('click', e => {
            
            if (e.target.matches('#form__submit')) {
                e.preventDefault();

                const title = element.title.value;
                const description = element.description.value;
                const expire =  element.expire.value;
                const importance = parseInt(element.importance.value);

                let formStatus = false;

                // FORM VALIDATION - SEND WHEN IMPORTANCE IS NUMBER AND SET
                if (title !== '' && /\d{4}\-\d{2,2}\-\d{2,2}/.test(expire) && Number.isInteger(importance)) formStatus = true, element.noteForm.classList.remove(helper.errorclass);          

                if (formStatus === true) {
                    const datas = {
                        title: title, 
                        description: description, 
                        expire: expire, 
                        importance: importance, 
                        complete: 0, 
                        completed_at: null
                    }

                    element.sort_clear.click();
                    this.noteService.addNote(datas).then(() => {
                    this.renderNotes();
                    helper.resetForm();
                });
                    
                } else {
                    element.noteForm.classList.add(helper.errorClass);

                    setTimeout(() => {
                        element.noteForm.classList.remove(helper.errorClass);
                    }, 300);
                }
            }

            if (e.target.matches('#form__clear')) {
                helper.resetForm();
            }

        });

        // FORM UPDATE
        element.noteFormUpdateContainer.addEventListener('click', e => {
            
            if (e.target.matches('#submit__update')) {
                e.preventDefault();
                
                const title = document.querySelector('#title__update').value;
                const description = document.querySelector('#description__update').value;
                const expire = document.querySelector('#expire__update').value;
                const importance = parseInt(document.querySelector('#importance__update').value);
                const noteId = document.querySelector('#note__updateId').value = this.noteEditId;
                const dataIndex = document.querySelector('#note__updateIndex').value;
                                
                let formStatus = false;
                
                if (title !== '' && /\d{4}\-\d{2,2}\-\d{2,2}/.test(expire) && 
                    Number.isInteger(importance)) formStatus = true, 
                    element.noteFormUpdateContainer.classList.remove(helper.errorClass);
                
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
                        element.flip.classList.toggle(helper.activeClass);
                    });
                    
                    
                } else {
                    element.noteFormUpdateContainer.classList.add(helper.errorClass);

                    setTimeout(() => {
                        element.noteFormUpdateContainer.classList.remove(helper.errorClass);
                    }, 300);
                }                
            }
            
            if (e.target.matches('#clear__update')) {
                element.flip.classList.toggle(helper.activeClass);
            }
        });

        // FILTER BUTTONS
        element.sort_createdAt.addEventListener('click', e => {
            element.sort_createdAt.classList.toggle(helper.activeClass);
            helper.sortingButtonState(helper.sortingState.created);

            this.noteService.sortCreatedAt(helper.getFilterState(element.sort_createdAt));
            this.sorting = helper.sortingState.created;
            this.renderNotes();      
        });

        element.sort_importance.addEventListener('click', e => {
            element.sort_importance.classList.toggle(helper.activeClass);
            helper.sortingButtonState(helper.sortingState.importance);
            
            this.noteService.sortImportance(helper.getFilterState(element.sort_importance));
            this.sorting = helper.sortingState.importance;
            this.renderNotes();           
        });

        element.sort_completed.addEventListener('click', e => {
            element.sort_completed.classList.toggle(helper.activeClass);
            helper.sortingButtonState(helper.sortingState.completed);

            element.sort_clear.parentElement.classList.add(helper.activeClass);
            this.noteService.sortCompleted(helper.getFilterState(element.sort_completed));
            this.sorting = helper.sortingState.completed;
            if (this.noteService.notes.length === 0) this.message = 'List must have at least one finished note!';
            this.renderNotes();          
        });
        
        element.sort_finished_date.addEventListener('click', e => {   
            element.sort_finished_date.classList.toggle(helper.activeClass);
            helper.sortingButtonState(helper.sortingState.expire);
            
            this.noteService.sortExpire(helper.getFilterState(element.sort_finished_date));
            this.sorting = helper.sortingState.expire;
            this.renderNotes();
        });
        
        // THEME TOGGLER
        element.theme__toggler.addEventListener('click', e => {
            document.body.classList.toggle('theme__bright');            
        });

        // CLEAR FILTER
        element.sort_clear.addEventListener('click', e => {
            helper.clearSorting();
            helper.sortingButtonState('clear');

            this.sorting = helper.sortingState.expire;
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

        // CLEAR LIST SHOW LOADING SPINNER
        element.notesListContainer.innerHTML = '';
        element.loading__spinner.classList.remove('hide'); 
        
        setTimeout(() => {
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
            }        
        
            // RENDER NOTES LISTING
            element.notesListContainer.innerHTML = template.noteListTemplate({ 
                notes: this.noteService.notes, 
                message: this.message,
                sorting: this.sorting,
            });

            element.loading__spinner.classList.add('hide');
            this.noteExpireToday();

        }, 200);

        // RENDER STATUS PANEL
        element.statusPanelContainer.innerHTML = template.statusPanelTemplate({ 
            status: this.noteService.statusPanel().notesTotal, 
            completed: this.noteService.statusPanel().notesCompleted,
            dateToday: helper.currentDate()
        });
        
        if (this.noteService.notes.length === 0) this.message;
    }

    // INIT APP
    noteAction() {
        this.initEventHandlers();
        this.noteService.loadData();
        this.noteService.statusPanel();
        this.renderNotes();
        helper.getBrowserLanguage();
    }
}
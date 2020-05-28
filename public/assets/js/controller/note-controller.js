export class NoteController {
    constructor(noteService) {
        this.noteService = noteService;

        // HANDLEBAR TEMPATES
        this.noteListTemplate = Handlebars.compile(document.getElementById('notes-list-template').innerHTML);

        // DOM-ELEMENTS
        this.notesListContainter = document.getElementById('standard__list');
    }

    // SHOW NOTES

    // INIT EVENTHANDLERS
    initEventHandlers() {
        console.log('INIT EVENTHANDLER CALLED');
        
    }

    // RENDER NOTES LIST
    renderNotes() {
        console.log('RENDER NOTES', this.noteService);
        this.notesListContainter.innerHTML = this.noteListTemplate({ note: this.noteService.note });
    }

    // INIT APP
    noteAction() {
        // this.initEventHandlers();
        this.noteService.loadData();
        this.renderNotes();
    }
}
import { Note } from '../models/note.js';

export class NoteService {
    constructor(noteStorage) {
        this.storage = noteStorage;
        this.notes = [];
    }

    // SORT CREATED DATE
    sortExpire(sortState) {
        const sortingList = this.notes.filter(a => a.expire);    
        sortingList.sort((a, b) => {
            if (sortState === false) return new Date(b.expire) - new Date(a.expire);
            if (sortState === true) return new Date(a.expire) - new Date(b.expire);
        });

        // RENDER RESULT LIST
        this.notes = sortingList;
    }

    // SORT CREATED DATE
    sortCreatedAt(sortState) {
        const sortingList = this.notes;
        sortingList.sort((a, b) => {
            if (sortState === false) return new Date(b.created) - new Date(a.created);
            if (sortState === true) return new Date(a.created) - new Date(b.created);
        });
    }

    // SORT COMPLETED
    sortCompleted(sortState) {
        const sortingList = this.notes.filter(a => a.complete);
        sortingList.sort((a, b) => {
            if (sortState === false) return  (b.complete - a.complete) + (new Date(b.completed_at) - new Date(a.completed_at));
            if (sortState === true) return  (a.complete - b.complete) + (new Date(a.completed_at) - new Date(b.completed_at));
        });

        this.notes = sortingList;
    }

    // SORT IMPORTANCE
    sortImportance(sortState) {
        const sortingList = this.notes;
        sortingList.sort((a, b) => {
            if (sortState === false) return  b.importance - a.importance;
            if (sortState === true) return  a.importance - b.importance;
        });
    }

    // UPDATE STATUS PANEL
    statusPanel() {
        return this.storage.getStatus();
    }

    // NOTE EXPIRE TODAY
    expireToday() {
        const sortingList = this.notes;
        // console.log('expire', this.notes);
        const today = new Date();
        const notesExpireToday = [];
        
        sortingList.forEach(note => {
            let expireDate = new Date(note.expire);
            if (today.getDate() == expireDate.getDate() &&
                today.getMonth() == expireDate.getMonth() &&
                today.getFullYear() == expireDate.getFullYear() &&
                note.complete === 0) notesExpireToday.push(note);
        });
        // console.log(notesExpireToday);

        return notesExpireToday;
    }

    // LOAD DATA
    loadData() {
        this.notes = this.storage.getNotes();
        return this.notes;
    }

    // NOTE UPDATE
    updateNote(datas, dataId) {       
        this.notes[datas.noteIndex].title = datas.title;
        this.notes[datas.noteIndex].description = datas.description;
        this.notes[datas.noteIndex].importance = datas.importance;
        this.notes[datas.noteIndex].expire = datas.expire;
        this.notes[datas.noteIndex].complete = datas.complete;
        this.notes[datas.noteIndex].completed_at = datas.completed_at;

        this.storage.update(datas, dataId);
    }

    // GET NOTE DATAS
    getNoteDatas(dataId, dataIndex) {
        const noteDatas = this.notes[dataId];
        
        return {
            noteDatas,    
            dataId
        }
    }

    // NOTE DELETE
    deleteNote(dataId, dataIndex) {
        this.notes.splice(dataId, 1);
        this.storage.deleteNote(dataIndex);
    }

    // NOTE COMPLETE
    completeNote(dataId, dataIndex) {
        this.notes[dataId].complete ^= true;
        this.notes[dataId].completed_at = new Date().toLocaleString('de-DE');
        this.storage.update(this.notes[dataId], dataIndex);
    }

    // ADD NEW NOTE
    addNote(note) {
        this.storage.createNote(new Note(note));
        //this.notes.push(new Note(note));
        window.location.reload(false);
    }
}
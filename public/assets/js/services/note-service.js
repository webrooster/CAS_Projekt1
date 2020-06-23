import { Note } from '../models/note.js';
import * as filter from '../helpers/helper.functions.js';

export class NoteService {
    constructor(noteStorage) {
        this.storage = noteStorage;
        this.notes = [];
    }

    // SORT EXPIRE DATE
    sortExpire(sortState) {
        const sortingTypeKey = filter.sortingState.expire;
        const sortingList = this.notes;
        filter.sortingDatesBy(sortingList, sortState, sortingTypeKey);
    }

    // SORT CREATED DATE
    sortCreatedAt(sortState) {
        const sortingTypeKey = filter.sortingState.created;
        const sortingList = this.notes;
        filter.sortingDatesBy(sortingList, sortState, sortingTypeKey);
    }

    // SORT COMPLETED
    sortCompleted(sortState) {
        const sortComplete = this.notes.filter(a => a.complete);
        sortComplete.sort((a, b) => {
            if (sortState === false) return  (b.complete - a.complete) + (new Date(b.completed_at) - new Date(a.completed_at));
            if (sortState === true) return  (a.complete - b.complete) + (new Date(a.completed_at) - new Date(b.completed_at));
        });

        this.notes = sortComplete;
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
        const today = new Date();
        const notesExpireToday = [];
        
        sortingList.forEach(note => {
            let expireDate = new Date(note.expire);
            if (today.getDate() == expireDate.getDate() &&
                today.getMonth() == expireDate.getMonth() &&
                today.getFullYear() == expireDate.getFullYear() &&
                (note.complete == false || note.complete == undefined)) notesExpireToday.push(note);
        });
        return notesExpireToday;
    }

    // LOAD DATA
    async loadData() {
        this.notes = this.storage.getNotes();
    }

    // NOTE UPDATE
    async updateNote(datas, dataId) {

        this.notes[datas.noteIndex].title = datas.title;
        this.notes[datas.noteIndex].description = datas.description;
        this.notes[datas.noteIndex].importance = datas.importance;
        this.notes[datas.noteIndex].expire = datas.expire;

        if (this.notes[datas.noteIndex].complete == undefined) datas.complete = false;
        if (this.notes[datas.noteIndex].complete === (true || 1)) datas.complete = true;
        if (datas.completed_at == undefined) datas.completed_at = this.notes[datas.noteIndex].completed_at;

        await this.storage.update(datas, dataId);
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
        this.storage.deleteNote(dataIndex);
        this.notes.splice(dataId, 1);
    }

    // NOTE COMPLETE
    completeNote(dataId, dataIndex) {
        this.notes[dataId].complete ^= true;
        this.notes[dataId].completed_at = new Date();
        this.storage.update(this.notes[dataId], dataIndex);
    }

    // ADD NEW NOTE
    async addNote(note) {
        let data = await this.storage.createNote(new Note(note));
        this.notes.push(data);
    }
}
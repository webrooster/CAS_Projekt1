/**
 * @type class
 * 
 * Represents a note
*/

export class Note {
    constructor({ title, description, created, importance, expire, complete }) {
      this.title = title;
      this.description = description;
      this.created = new Date().toLocaleString('de-DE');
      this.importance = importance;
      this.expire = expire;
      this.complete = complete;
    }
}
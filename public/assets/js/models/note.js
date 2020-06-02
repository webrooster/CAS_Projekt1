/**
 * @class Model
 * 
 * Represents a note
*/

export class Note {
    constructor({ title, description, created, importance, expire, complete, completed_at }) {

      this.id = this.randomId();
      this.title = title;
      this.description = description;
      this.created = this.currentDate();
      this.importance = importance;
      this.expire = expire; //this.convertExpireDate(expire);        
      this.complete = complete;
      this.completed_at = this.currentDate(); // Set current date; prevents sorting bug without dates.     
    }

    toJSON() {
      return {
        id: this.id,
        title: this.title,
        description: this.description,
        created: this.created,
        importance: this.importance,
        expire: this.expire,
        complete: this.complete,
        completed_at: this.completed_at  
      }
    }

    currentDate() {
      let today = new Date().toLocaleString('de-DE');
      return today;
    }

    randomId() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
          (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
          ).toString(16)
        );
    }
}
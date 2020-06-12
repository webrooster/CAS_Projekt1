/**
 * @type class
 * 
 * Represents a note
*/

export class Note {
    constructor({ title, description, created, importance, expire, complete }) {

      // this.id = this.randomId();
      this.title = title;
      this.description = description;
      this.created = new Date().toLocaleString('de-DE');
      this.importance = importance;
      this.expire = expire; //this.convertExpireDate(expire);        
      this.complete = complete;
      //this.completed_at = this.currentDate(); // Set current date; prevents sorting bug without dates.     
    }

    currentDate() {
      const today = new Date(); //.toLocaleString('de-DE');
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
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

    // FORMAT DATE
    // formatDate() {
    //   const dateCreated = new Date();
    //   const timeZone = dateCreated + dateCreated.getTimezoneOffset();
    //   const time = new Date(timeZone).toUTCString();

    //   console.log('TIMEZONE', time);

    //   return time;
    // }

    // convertExpireDate(expire) {
    //   const convertGermanDate = new Date(expire); //.toLocaleString('de-DE');
    //   const dateTimeZone = new Date(convertGermanDate);
    //   const date = new Date(dateTimeZone).toLocaleString('de-DE');
    //   console.log('EXPIRE', new Date(dateTimeZone).toLocaleString('de-DE'), 'dateTimeZone', new Date(dateTimeZone).getTimezoneOffset());
    //   return date;  
    // }

    currentDate() {
      let today = new Date().toLocaleString('de-DE');
      return today;
    }

    // currentDate() {
    //   let today = new Date();
    //   let seconds = String(today.getSeconds());
    //   let minutes = String(today.getMinutes());
    //   let hours = String(today.getHours());
    //   let dd = String(today.getDate()).padStart(2, '0');
    //   let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    //   let yyyy = today.getFullYear();
    //   today = `${ dd }.${ mm }.${ yyyy }, at ${hours}:${minutes}:${seconds}`;
    //   return today;
    // }

    randomId() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
          (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
          ).toString(16)
        );
    }
}
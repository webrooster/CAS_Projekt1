import { DOM } from "../views/base"

export default class Form {
    constructor(title, description, expireAt, importance) {
        this.title = title
        this.description = description
        this.expireAt = expireAt
        this.importance = importance
    }

    formValidation() {

      // if (this.title == '') DOM.title.classList.add('error') ?  DOM.title.classList.add('error') : DOM.title.classList.add('error')

      if (this.title == '' || this.expireAt == '' || this.importance === typeof num) {
        return false
      } else {
        return true
      }
      
      // console.log(`Title: ${this.title}, Desc: ${this.description}, Importance: ${this.importance}`)
  
      // return (`Title: ${this.title}, Desc: ${this.description}, Importance: ${this.importance}`)
    }

    // randomId() {
    //     return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    //       (
    //         c ^
    //         (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    //       ).toString(16)
    //     );
    // }

}
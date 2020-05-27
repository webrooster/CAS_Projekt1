import { DOM } from "../views/base.js"

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
}
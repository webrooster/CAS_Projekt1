export default class Form {
    constructor(title, description, expireAt, importance) {
        this.title = title
        this.description = description
        this.expireAt = expireAt
        this.importance = importance
    }

    randomId() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
          (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
          ).toString(16)
        );
    }

    formValidation() {

        if (this.title == '') console.log(`${this.title} validation failed`)

        console.log(`${this.title}, ${this.description} ${this.importance}`)
    }
}



// document.addEventListener("DOMContentLoaded", function (event) {
//     var _selector = document.querySelector('#theme__toggler');

//     _selector.addEventListener('click', () => {
//         document.body.classList.toggle('theme__dark');
//     });
// });

// const $formsubmit = document.querySelector('#submit');
// const $formreset = document.querySelector('#reset');
// const $editnote = document.querySelector('.noteslist');

// $editnote.addEventListener('click', e => {
//     if (event.target.classList[0] == 'edit') {
//         const dataIndex = event.target.parentElement.parentElement.parentElement.getAttribute('data-index');
//         console.log('dataIndex', e.target, dataIndex);

//     } else if (event.target.classList[1] == 'fa-edit') {
//         const dataIndex = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-index');
//         console.log('dataIndex', e.target, dataIndex);

//     }
// });    

// $formsubmit.addEventListener('click', (e) => {
//     e.preventDefault();
//     console.log('Form submit clicked!')
// });

// $formreset.addEventListener('click', (e) => {
//     e.preventDefault();
//     // alert('Form reset clicked!')
// });
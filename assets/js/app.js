document.addEventListener("DOMContentLoaded", function (event) {
    var _selector = document.querySelector('#theme__toggler');

    _selector.addEventListener('click', () => {
        document.body.classList.toggle('theme__dark');
    });
});

const $formsubmit = document.querySelector('#submit');
const $formreset = document.querySelector('#reset');
const $editnote = document.querySelector('.noteslist');

$editnote.addEventListener('click', e => {
    if (event.target.classList[0] == 'edit') {
        const dataIndex = event.target.parentElement.parentElement.parentElement.getAttribute('data-index');
        console.log('dataIndex', e.target, dataIndex);

    } else if (event.target.classList[1] == 'fa-edit') {
        const dataIndex = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-index');
        console.log('dataIndex', e.target, dataIndex);

    }
});    

$formsubmit.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Form submit clicked!')
});

// $formreset.addEventListener('click', (e) => {
//     e.preventDefault();
//     // alert('Form reset clicked!')
// });
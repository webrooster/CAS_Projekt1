document.addEventListener("DOMContentLoaded", function (event) {
    var _selector = document.querySelector('#theme__toggler');

    _selector.addEventListener('click', () => {
        document.body.classList.toggle('theme__dark');
    });
});

const $formsubmit = document.querySelector('#submit');
const $formreset = document.querySelector('#reset');

$formsubmit.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Form submit clicked!')
});

$formreset.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Form reset clicked!')
});
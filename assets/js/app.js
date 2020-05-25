document.addEventListener("DOMContentLoaded", function (event) {
    var _selector = document.querySelector('#theme__toggler');

    _selector.addEventListener('click', () => {
        document.body.classList.toggle('theme__dark');
    });
});
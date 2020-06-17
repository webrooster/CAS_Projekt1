import { element } from './selectors.js';

// GET NOTE INDEX
export const getNoteIndex = () => {
    const dataIndex = event.target.parentElement.parentElement.parentElement.getAttribute('data-index');
    const dataId = event.target.parentElement.parentElement.parentElement.getAttribute('data-id');

    return {
        dataIndex,
        dataId
    }
}

// FILTER BUTTON STATE
export const getFilterState = (button) => {
    return button.classList.contains('active');
}

// RESET FORM
export const resetForm = () => {
    element.clear.click();
    element.importance.selectedIndex = null;
    element.noteForm.classList.remove('error');
}

// STATUS PANEL CURRENT DATE
export const currentDate = () => {
    let dateToday = new Date();
    let today = dateToday.toLocaleString(getBrowserLanguage(), {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    return `${ today }`;
}

export const getBrowserLanguage = () => {
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang == 'de') return 'de-CH';
    if (userLang == 'en') return 'en-US';
    if (userLang == 'fr') return 'de-DE';
}
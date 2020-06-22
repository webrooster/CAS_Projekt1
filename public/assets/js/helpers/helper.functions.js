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

// DATE FILTER
export const sortingDatesBy = (sortingList, sortState, sortingTypeKey) => {
    sortingList.sort((a, b) => {
        if (sortState === false) return new Date(b[sortingTypeKey]) - new Date(a[sortingTypeKey]);
        if (sortState === true) return new Date(a[sortingTypeKey]) - new Date(b[sortingTypeKey]);
    });

    return sortingList;
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

// GET BROWSER LANGUAGE
export const getBrowserLanguage = () => {
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang == 'de') return 'de-CH';
    if (userLang == 'en') return 'en-US';
    if (userLang == 'fr') return 'de-DE';
}

// CLEAR SORTING
export const clearSorting = () => {
    // UNCHECK SORTING BUTTONS
    element.sort_createdAt.checked = false;
    element.sort_importance.checked = false;
    element.sort_completed.checked = false;
    element.sort_finished_date.checked = false;
    // element.sort_completed.parentElement.classList.remove('active');
    element.sort_clear.parentElement.classList.remove('active');
}

// UI INTERACTION CLASSES
export const activeClass = 'active';
export const errorClass = 'error';
export const sortingState = {
    created: 'created',
    importance: 'importance',
    completed: 'completed',
    expire: 'expire'
}

// SORTING BUTTONS - REMOVE ACTIVE CLASSES
export const removeActiveState = () => {
    const elems = document.querySelectorAll('.button__sorting');
    return [].forEach.call(elems, (button) => {
        button.classList.remove(activeClass);
    });
}

// SORTING BUTTON STATES
export const sortingButtonState = (button) => {
    button === sortingState.expire ? element.sort_createdAt.parentElement.classList.add(activeClass) 
        : element.sort_createdAt.parentElement.classList.remove(activeClass);
    button === sortingState.importance ? element.sort_importance.parentElement.classList.add(activeClass) 
        : element.sort_importance.parentElement.classList.remove(activeClass);
    button === sortingState.expire ? element.sort_finished_date.parentElement.classList.add(activeClass) 
        : element.sort_finished_date.parentElement.classList.remove(activeClass);
    button === sortingState.completed ? element.sort_completed.parentElement.classList.add(activeClass) 
        : false;

    if (button === 'clear') removeActiveState();
}
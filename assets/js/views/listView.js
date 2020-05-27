import { DOM } from '../views/base.js'

export const renderList = (notes) => {

    const notes_list = DOM.standard__list

    console.log(notes)

    notes.forEach(note => {
        
        const listtemplate = `
        <li class="note" data-index="${ note.id }">
            <div class="note__dropdown">

                <div class="note__complete">
                    <button class="btn btn--completed">
                        <i class="fas fa-check-circle"></i>
                    </button>
                </div>

                <div class="note__content">
                    <span class="note__created">${ note.expire }</span>

                    <h2 class="note__title">${ note.title }</h2>
                    <p class="note__description note__dropdown note__dropdown--open">
                        ${ note.description }
                    </p>
                </div>

                <div class="note__infos">
                    <span class="note__completed">04.07.2020</span>
                    <span class="note__importance">
                        ${ renderImportance(note) }
                    </span>
                </div>

                <div class="note__edit">
                    <button class="edit">
                        <i class="far fa-edit"></i>
                    </button>
                </div>

            </div>
        </li>
    `

    notes_list.insertAdjacentHTML('afterbegin', listtemplate)

    });
}

export const renderImportance = (note) => {
        
    const stars = note.importance;
    const starMap = [];

    for (let index = 0; index < stars; index++) {
        const star = `<i class="fas fa-star"></i>`;
        starMap.push(star);
    }
    
    return starMap.join('');
    
}


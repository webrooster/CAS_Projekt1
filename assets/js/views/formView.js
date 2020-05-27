import { DOM } from '../views/base.js';

/**
 * Form field title
 * @type string
 */
export const getTitle = () => DOM.title.value

/**
 * Form field description
 * @type string
 */
export const getDescription = () => DOM.description.value

/**
 * Form field date
 * @type date
 */
export const getExpireDate = () => DOM.expire.valueAsDate = new Date()

/**
 * Form field importance: select
 * @type num
 */
export const getImportance = () => {
    const selectValue = DOM.importance.value
    return parseInt(selectValue, 10);
}
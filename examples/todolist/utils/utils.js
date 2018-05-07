import Storage from './storage';
import { ITEMS_STORAGE_KEY } from './constants';

// returns all todolist items
export const getItems = () =>
    Storage.get(ITEMS_STORAGE_KEY) || {};

/**
 * Returns a unique id to be used as the todo list item id.
 * It simply scans the existing items and returns an id
 * greater than the max existing id.
 *
 * @return {Number} Unique id that can be used for todolist item
 */
export function getUniqueId() {
    const existingItems = getItems();
    const existingItemsKeys = existingItems && Object.keys(existingItems);
    let uniqueId = 1;

    if (existingItemsKeys && existingItemsKeys.length) {
        const ids = existingItemsKeys.map(id => parseInt(id, 10));
        const lastId = Math.max(...ids);
        uniqueId = lastId + 1;
    }

    return uniqueId;
}

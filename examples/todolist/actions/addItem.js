/* eslint-disable no-param-reassign */

import Storage from '../utils/storage';
import { getUniqueId } from '../utils/utils';
import { ITEMS_STORAGE_KEY } from '../utils/constants';

/**
 * Adds a new item to the existing todo list.
 * Expects mandatory value property as the payload.
 *
 * @param {Object} store    Store instance
 * @param {Object} payload  Payload with values
 */
export default function addItem(store, payload = {}) {
    const { value } = payload;

    if (!value) return;

    // create new item
    const id = getUniqueId();
    const createdAt = new Date().getTime();
    const item = { value, createdAt };
    const itemObj = { [id]: item };

    // update state
    store.state = {
        ...store.state,
        items: {
            ...store.state.items,
            ...itemObj,
        },
    };

    // update localStorage
    Storage.update(ITEMS_STORAGE_KEY, itemObj);
}

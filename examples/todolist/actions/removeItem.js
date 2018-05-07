/* eslint-disable no-param-reassign */

import Storage from '../utils/storage';
import { getItems } from '../utils/utils';
import { ITEMS_STORAGE_KEY } from '../utils/constants';

/**
 * Deletes a previously added item from the existing todo list.
 * Expects mandatory id property as the payload.
 *
 * @param {Object} store    Store instance
 * @param {Object} payload  Payload with id
 */
export default function removeItem(store, payload = {}) {
    const { id } = payload;

    if (!id) return;

    const existingItems = getItems();

    // delete value
    delete existingItems[id];
    delete store.state.items[id];

    // update state
    store.state = {
        ...store.state,
        items: { ...store.state.items },
    };

    // update localStorage
    Storage.set(ITEMS_STORAGE_KEY, existingItems);
}

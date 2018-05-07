/* eslint-disable no-param-reassign */

import Storage from '../utils/storage';
import { getItems } from '../utils/utils';
import { ITEMS_STORAGE_KEY } from '../utils/constants';

/**
 * Marks the given item as completed/incomplete.
 * Expects the mandatory id property and optional completed.
 * This method can also be used to mark as incomplete by
 * setting the optional `completed` property to `false`.
 *
 * @param {Object} store    Store instance
 * @param {Object} payload  Payload with values
 */
export default function toggleCompleted(store, payload = {}) {
    const { id, completed = true } = payload;

    if (!id) return;

    const existingItems = getItems();
    const existingItemsKeys = existingItems && Object.keys(existingItems);

    if (!existingItemsKeys || !existingItemsKeys.length) return;

    const item = existingItems[id];

    if (!item) return;

    const currentTime = new Date().getTime();

    // add current time to indicate the completed time
    item.completedAt = completed ? currentTime : null;

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

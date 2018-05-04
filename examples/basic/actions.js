/* eslint-disable no-param-reassign */

export function updateUsername(store, username) {
    store.state = { ...store.state, username };
}

export function updateEmail(store, email) {
    store.state = { ...store.state, email };
}

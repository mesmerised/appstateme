/**
 * Returns a bound action object whose methods always have the
 * store instance as the first param upon invocation.
 *
 * @example
 *  const MyStore = createStore();
 *  const actions = {
 *      addTodo(store, payload) { // some store manipulation },
 *      updateTodo(store, payload) { // some store manipulation },
 *  };
 *  const boundActions = bindStoreToActions(MyStore, actions);
 *
 *  boundActions.addTodo(payload); // `store` param is always `MyStore`
 *  boundActions.updateTodo(payload); // `store` param is always `MyStore`
 *
 * @param {Object} store Store instance
 * @param {Object} actions Action functions map
 * @return {Proxy} A proxy on the actions object.
 */
export default function bindStoreToActions(store, actions) {
    if (!store || !actions) {
        throw new TypeError('Cannot bind the given store to actions. A valid `store` instance and a map of `actions` functions, are required for binding.');
    }

    return new Proxy(actions, {
        get(target, property) {
            const originalMethod = target[property];
            return (...args) => originalMethod(store, ...args);
        },
        set(target, property, value) {
            target[property] = value; // eslint-disable-line no-param-reassign
            return true;
        },
    });
}

import React, { Component } from 'react';
import bindStoreToActions from './bindStoreToActions';

/**
 * Gets display name of the component.
 *
 * @param  {Component} WrappedComponent     React component
 * @return {String}                         Component name
 */
const getDisplayName = WrappedComponent =>
    WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

/**
 * Connects the store and actions to the React component.
 *
 * @example
 *     const Comp = connect(store, actions)(MyComponent);
 *
 * @param  {Object} store      Store instance
 * @param  {Object} [actions]  Action functions map
 * @return {Function}          HOC factory function
 */
const connect = (store, actions) => (WrappedComponent) => {
    const boundActions = store && actions ?
        bindStoreToActions(store, actions) : null;

    return class ConnectedComponent extends Component {
        static displayName = `HOC(${getDisplayName(WrappedComponent)})`;

        state = { data: store.state };

        componentDidMount() {
            this._unsubscribe = store.subscribe(newState =>
                this.setState({ data: newState }));

            // handle cases where values could
            // have changed between render and mount
            if (this.state.data !== store.state) {
                this.setState({ data: store.state });
            }
        }

        componentWillUnmount() {
            // remove subscription
            this._unsubscribe();
        }

        render() {
            return (
                <WrappedComponent
                    actions={boundActions}
                    {...this.props}
                    {...this.state.data}
                />
            );
        }
    };
};

export default connect;

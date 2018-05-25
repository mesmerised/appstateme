# appstateme

A tiny yet powerful state management library that lets you focus on your application logic without getting in your way.

#### Inspiration
While there are fairly good amount of fully fledged libraries out there, not always you want the boilerplate code and architectural decisions that comes along with them, especially when you are still trying to validate your application idea and need to move fast. No doubt [`redux`](https://redux.js.org/) and [`mobx`](https://mobx.js.org/) are two brilliant solutions, nonetheless they both have their own learning curves, caveats and boilerplate to wrap your head around.

On the other hand, `appstateme` has a basic architecture pattern with minimal learning curve. As long as you know the [basic concepts of the Flux architecture](https://github.com/facebook/flux/tree/master/examples/flux-concepts), you are ready to build scalable, clean structured apps with `appstateme`. Though this library is view layer agnostic, it blends well with [`react`](https://reactjs.org/) and you get a rapid development framework out of the box.

#### Install
The library is available as a UMD package. If you prefer to use the traditional approach, you may download and include the [appstateme.min.js](./lib/appstateme.min.js) file directly in the `script` tag.

```shell
npm install --save appstateme
```

## Usage Examples
Check out the [examples](./examples/) folder for some rudimentary setups. Since none of the example is complete without a traditional TODO List app example, [there's one using this library](./examples/todolist/) ;)

```shell
# available at http://localhost:1234

npm run example:basic       # basic example
npm run example:todolist    # todolist app example
```

#### Basic Usage
```js
// Step 1: Create your store (store.js)
// ------
import { createStore } from 'appstateme';

export default createStore({/* initial state */});


// Step 2: Create actions that would modify state (actions.js)
// ------
export function updateUsername(store, username) {
    store.state = { ...store.state, username };
}

export function updateEmail(store, email) {
    store.state = { ...store.state, email };
}

// Step 3: Create component (MyUserComponent.js)
// ------
class MyUserComponent extends Component {
    handleUsernameChange = (ev) => {
        // all actions would be passed to
        // the component once connected
        const { actions } = this.props;
        const { updateUsername } = actions;

        updateUsername(ev.target.value);
    }

    handleEmailChange = (ev) => {
        // all actions would be passed to
        // the component once connected
        const { actions } = this.props;
        const { updateEmail } = actions;

        updateEmail(ev.target.value);
    }

    render() {
        const { username, email } = this.props;

        return (
            <div>
                <input
                    type="text"
                    value={username}
                    onChange={this.handleUsernameChange} />
                <input
                    type="email"
                    value={email}
                    onChange={this.handleEmailChange} />
            </div>
        );
    }
}

// Step 4: Stitch store, actions and component
// ------
import { connect } from 'appstateme';

import store from './store.js';
import * as actions from './actions.js';
import MyUserComponent from './MyUserComponent';

// create the connected component
const MyConnectedUserComp = connect(store, actions)(MyUserComponent);

// use the connected component wherever you like
ReactDOM.render(<MyConnectedUserComp />, document.getElementById('root'));
```

#### Plain store (without react)
```js
const store = createStore({value: 1});
const handler = () => console.log('handler invoked');
store.subscribe(handler);
store.state = { value: 2 };
// logs -> handler invoked

const log = (...args) => console.log(...args);
store.subscribe(log);
store.state = {
    ...store.state,
    anotherValue: 10
};
// logs ->
// handler invoked
// {value:2, anotherValue: 10}, {value: 2}, store instance

store.unsubscribe(handler);
store.state = {
    ...store.state,
    anotherValue: 50
};
// logs ->
// {value:2, anotherValue: 50}, {value:2, anotherValue: 10}, store instance
```

#### Plain store and bound actions (without react)
```js
const MyStore = createStore();
const actions = {
    addTodo(store, payload) { /* some store manipulation */ },
    updateTodo(store, payload) { /* some store manipulation */ },
};
const boundActions = bindStoreToActions(MyStore, actions);

boundActions.addTodo(payload); // `store` param is always `MyStore`
boundActions.updateTodo(payload); // `store` param is always `MyStore`
```

## API

#### `createStore(initialState)`: `Store Instance`
Creates the store instance with the optional provided initial state values.

| param  | type  | required | description |
| ------ | ----- | -------- | ----------- |
| `initialState` | `Object` | no | Initial state of the store |

The store instance has the following properties for manipulating and observing the state of the store.

| property  | type  | description |
| --------- | ----- | ----------- |
| `state` | `getter/setter` | The property that holds the values of the state. Use the `state` property directly to get/set the state of your store, the subscribed handlers would be automatically invoked internally.<br><br>Example:<br>```mystore.state = {key1: value1, ... }``` |
| `subscribe` | `function` | Use this method to attach a handler for observing the changes to the state. It returns the unsubscribe function to enable removal of the handler without having an explicit reference of the handler. <br><br>`subscribe(handler)`: `<unsubscribe fn>`<br><br>Handler function format:<br>`handler(newState, prevState, storeInstance)` |
| `unsubscribe` | `function` | Use this method to explicitly remove any previously added subscription. <br><br>`unsubscribe(handler)`: `void` |
| `unsubscribeAll` | `function` | Use this method to explicitly remove all previously added subscriptions at once. <br><br>`unsubscribeAll()`: `void` |

#### `connect(store, actions)`: `(WrappedComponent) => Component`
Creates a HOC function that binds together the store and the actions. Use this HOC to wrap components that would react to the change in the state of the store and receive all state properties as their props. In addition, the components would also receive all the `actions` as a prop.

| param  | type  | required | description |
| ------ | ----- | -------- | ----------- |
| `store` | `Store Instance` | yes | Previously created store instance |
| `actions` | `Object` | no | All actions as an action object |
| `WrappedComponent` | `React Component` | yes | Any type of react component |

#### `bindStoreToActions(store, actions)`: `Object`
Returns the bound actions object. Each of the bound action receives the provided store as its first argument.
This method is intended to be used in applications that do not use react. Prefer `connect` method if already using react.

| param  | type  | required | description |
| ------ | ----- | -------- | ----------- |
| `store` | `Store Instance` | yes | Previously created store instance |
| `actions` | `Object` | no | All actions as an action object |

## Caveats
This library uses [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) and [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) for its core implementations. If you plan to use this library on browsers that do not yet support these features, please also consider including polyfills for those browsers.

- [WeakMap polyfill](https://github.com/polygonplanet/weakmap-polyfill)
- [Proxy polyfill](https://github.com/GoogleChrome/proxy-polyfill)

The library has a `peer-dependency` on react. If you are not using react in your application, you can ignore the peer-dependency warning while installing the library with npm.

## Who's using it
- [mesmerized](https://mesmerized.me/) - Transform your browser tabs

Built something cool using this? Submit a PR to add it to this section.

## Contributions
- Fork the project
- Commit your enhancements and bug fixes
- Create a pull request describing the changes

```shell
npm run dev     # watch changes
npm run build   # create library builds
npm run test    # run tests
```

## License
`appstateme` is licensed under the [MIT License](https://opensource.org/licenses/MIT)

# stateme

A tiny yet powerful state management library that lets you focus on your application logic without getting in your way.

#### Inspiration
While there are fairly good amount of fully fledged libraries out there, not always you want the boilerplate code and architectural decisions that comes along with them, especially when you are still trying to validate your application idea and need to move fast. No doubt [`redux`](https://redux.js.org/) and [`mobx`](https://mobx.js.org/) are two brilliant solutions, nonetheless they both have their own learning curves, caveats and boilerplate to wrap your head around.

Though this library is view layer agnostic, it blends well with [`react`](https://reactjs.org/) and you get a rapid development framework out of the box.

#### Install
The library is available as a UMD package. If you prefer to use the traditional approach, you may download and include the [stateme.min.js](./lib/stateme.min.js) file directly in the `script` tag.

```shell
npm install --save stateme
```

## Usage Examples
Check out the [examples](./examples/) folder for some rudimentary setups.

#### Basic Usage
```js
// Step 1: Create your store (store.js)
// ------
import { createStore } from 'stateme';

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
import { connect } from 'stateme';

import store from './store.js';
import * as actions from './actions.js';
import MyUserComponent from './MyUserComponent';

// create the connected component
const MyConnectedUserComp = connect(store, actions)(MyUserComponent);

// use the connected component wherever you like
ReactDOM.render(<MyConnectedUserComp />, document.getElementById('root'));
```

#### Multi-store
```js
// @TODO: Add example
```

#### Multi-component
```js
// @TODO: Add example
```

#### Plain store (without react)
```js
// @TODO: Add example
```

#### Plain store and bound actions (without react)
```js
// @TODO: Add example
```

## API
@TODO: Add docs

## Caveats
This library uses [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) and [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) for its core implementations. If you plan to use this library on browsers that do not yet support these features, please also consider including polyfills for those browsers.

- [WeakMap polyfill](https://github.com/polygonplanet/weakmap-polyfill)
- [Proxy polyfill](https://github.com/GoogleChrome/proxy-polyfill)

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
`stateme` is licensed under the [MIT License](https://opensource.org/licenses/MIT)

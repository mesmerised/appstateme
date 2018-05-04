/*!
 * Copyright (c) Emad Alam https://emad.in
 * https://github.com/mesmerised/stateme
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define("appstateme", ["react"], factory);
	else if(typeof exports === 'object')
		exports["appstateme"] = factory(require("react"));
	else
		root["appstateme"] = factory(root["react"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = __webpack_require__(1);

Object.defineProperty(exports, 'createStore', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_store).default;
  }
});

var _connect = __webpack_require__(2);

Object.defineProperty(exports, 'connect', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_connect).default;
  }
});

var _bindStoreToActions = __webpack_require__(4);

Object.defineProperty(exports, 'bindStoreToActions', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_bindStoreToActions).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createStore;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// hold all subscriptions
var _subscriptions = new WeakMap();
// hold all state trees
var _states = new WeakMap();

/**
 * Store class to manage state and subscriptions.
 *
 * @example
 *     const store = new Store({value: 1});
 *     const handler = () => console.log('handler invoked');
 *
 *     store.subscribe(handler);
 *     store.state = { value: 2 };
 *     // logs ->
 *     // handler invoked
 *
 *     const log = (...args) => console.log(...args);
 *     store.subscribe(log);
 *     store.state = {
 *         ...store.state,
 *         anotherValue: 10
 *     };
 *     // logs ->
 *     // handler invoked
 *     // {value:2, anotherValue: 10}, {value: 2}, store instance
 *
 *     store.unsubscribe(handler);
 *     store.state = {
 *         ...store.state,
 *         anotherValue: 50
 *     };
 *     // logs ->
 *     // {value:2, anotherValue: 50}, {value:2, anotherValue: 10}, store instance
 */

var Store = exports.Store = function () {
    /**
     * Store constructor.
     *
     * @param  {Object} initialState    Initial state
     */
    function Store() {
        var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Store);

        _subscriptions.set(this, []);
        _states.set(this, initialState);
    }

    /**
     * Getter for the state.
     *
     * @return {Object} The current state of the store
     */


    _createClass(Store, [{
        key: 'subscribe',


        /**
         * Add a subscription to the store.
         *
         * @param  {Function} handler   Function to invoke
         * @return {Function}           Function to unsubscribe
         */
        value: function subscribe(handler) {
            var _this = this;

            if (typeof handler === 'function') {
                var subscriptions = _subscriptions.get(this);
                subscriptions.push(handler);
            }
            // return function to unsubscribe
            return function () {
                return _this.unsubscribe(handler);
            };
        }

        /**
         * Removes the previously added subscription from the store.
         *
         * @param  {Function} handler   Previously added handler function
         */

    }, {
        key: 'unsubscribe',
        value: function unsubscribe(handler) {
            if (!handler || typeof handler !== 'function') return;

            var subscriptions = _subscriptions.get(this);
            var filteredHandlers = subscriptions.filter(function (s) {
                return s !== handler;
            });

            _subscriptions.set(this, filteredHandlers);
        }

        /**
         * Removes all subscriptions from the store.
         */

    }, {
        key: 'unsubscribeAll',
        value: function unsubscribeAll() {
            _subscriptions.set(this, []);
        }
    }, {
        key: 'state',
        get: function get() {
            return _states.get(this);
        }

        /**
         * Setter for the store.
         * Also invokes the handlers after setting the state.
         *
         * @param  {Object} newState    Updated state of the store.
         */
        ,
        set: function set(newState) {
            var _this2 = this;

            var handlers = _subscriptions.get(this);
            var prevState = _states.get(this);

            // set the new state
            _states.set(this, newState);
            // invoke the registered handlers
            handlers.forEach(function (h) {
                return h(newState, prevState, _this2);
            });
        }
    }]);

    return Store;
}();

/**
 * Creates a new store instance with the provided
 * defaults to manage state and subscriptions.
 *
 * @example
 *     const store = createStore({value: 1});
 *     const handler = () => console.log('handler invoked');
 *
 *     store.subscribe(handler);
 *     store.state = { value: 2 };
 *     // logs ->
 *     // handler invoked
 *
 *     const log = (...args) => console.log(...args);
 *     store.subscribe(log);
 *     store.state = {
 *         ...store.state,
 *         anotherValue: 10
 *     };
 *     // logs ->
 *     // handler invoked
 *     // {value:2, anotherValue: 10}, {value: 2}, store instance
 *
 *     store.unsubscribe(handler);
 *     store.state = {
 *         ...store.state,
 *         anotherValue: 50
 *     };
 *     // logs ->
 *     // {value:2, anotherValue: 50}, {value:2, anotherValue: 10}, store instance
 */


function createStore() {
    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return new Store(initialState);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _bindStoreToActions = __webpack_require__(4);

var _bindStoreToActions2 = _interopRequireDefault(_bindStoreToActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Gets display name of the component.
 *
 * @param  {Component} WrappedComponent     React component
 * @return {String}                         Component name
 */
var getDisplayName = function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

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
var connect = function connect(store, actions) {
    return function (WrappedComponent) {
        var _class, _temp2;

        var boundActions = store && actions ? (0, _bindStoreToActions2.default)(store, actions) : null;

        return _temp2 = _class = function (_Component) {
            _inherits(ConnectedComponent, _Component);

            function ConnectedComponent() {
                var _ref;

                var _temp, _this, _ret;

                _classCallCheck(this, ConnectedComponent);

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ConnectedComponent.__proto__ || Object.getPrototypeOf(ConnectedComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = { data: store.state }, _temp), _possibleConstructorReturn(_this, _ret);
            }

            _createClass(ConnectedComponent, [{
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var _this2 = this;

                    this._unsubscribe = store.subscribe(function (newState) {
                        return _this2.setState({ data: newState });
                    });

                    // handle cases where values could
                    // have changed between render and mount
                    if (this.state.data !== store.state) {
                        this.setState({ data: store.state });
                    }
                }
            }, {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    // remove subscription
                    this._unsubscribe();
                }
            }, {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement(WrappedComponent, _extends({
                        actions: boundActions
                    }, this.props, this.state.data));
                }
            }]);

            return ConnectedComponent;
        }(_react.Component), _class.displayName = 'HOC(' + getDisplayName(WrappedComponent) + ')', _temp2;
    };
};

exports.default = connect;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = bindStoreToActions;
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
function bindStoreToActions(store, actions) {
    if (!store || !actions) {
        throw new TypeError('Cannot bind the given store to actions. A valid `store` instance and a map of `actions` functions, are required for binding.');
    }

    return new Proxy(actions, {
        get: function get(target, property) {
            var originalMethod = target[property];
            return function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                return originalMethod.apply(undefined, [store].concat(args));
            };
        },
        set: function set(target, property, value) {
            target[property] = value; // eslint-disable-line no-param-reassign
            return true;
        }
    });
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=appstateme.js.map
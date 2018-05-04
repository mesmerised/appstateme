/* eslint-disable import/no-extraneous-dependencies */

import ReactDOM from 'react-dom';
import React from 'react';

import { connect } from '../../lib/stateme.min';

import MyStore from './store';
import * as MyActions from './actions';
import MyApp from './MyAppComponent';

// Stitch together the store, the actions and the component.
// The other possibility is to just create a higher order
// function that includes store+actions. You can later connect
// the same store+actions combo across multiple components.
//
// @example:
//  const connectedHOC = connect(MyStore, MyActions);
//
//  const MyConnectedComp1 = connectedHOC(MyComp1);
//  const MyConnectedComp2 = connectedHOC(MyComp2);

const App = connect(MyStore, MyActions)(MyApp);

ReactDOM.render(<App />, document.getElementById('root'));

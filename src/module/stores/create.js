import rootReducer from './modules';

import { createStore } from 'redux';

// This is for integrating with the Redux Devtool Chrome/Firefix extension:
// https://github.com/zalmoxisus/redux-devtools-extension
const devToolExtension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export default () => createStore(rootReducer, devToolExtension);

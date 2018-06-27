import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../containers/root/reducer';

// Configure Middleware : Default with thunk to handle async actions
const middlewares = [thunk];
// Configure logger as middleware in Dev Mode
if (__DEV__ === true) middlewares.push(logger);

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const configureStore = initState => createStoreWithMiddleware(rootReducer, initState);

export default configureStore;


import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

// Configure Middleware : Default with thunk to handle async actions
const middlewares = [thunk];
// Configure logger as middleware in Dev Mode
if (__DEV__) middlewares.push(logger);

const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(...middlewares));
  return store;
};

export default configureStore;

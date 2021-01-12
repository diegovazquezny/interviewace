import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/Index.js';
import thunk from 'redux-thunk';

const store = createStore(
  reducers, applyMiddleware(thunk)
);

export default store;
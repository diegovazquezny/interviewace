import { createStore } from 'redux';
import reducers from './Reducers/Index.js';

const store = createStore(
  reducers,
);

export default store;
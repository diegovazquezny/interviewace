import { combineReducers } from 'redux';
import reducer from './Reducer';
import uiReducer from './uiReducer';

export default combineReducers({
  reducer, 
  uiReducer
});
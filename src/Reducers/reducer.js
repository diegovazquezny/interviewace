import * as types from './actionTypes';
import initialState from '../context/initialState';

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.UPDATE_USER_INFO:
      console.log('payload ->', action.payload); 
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        userName: action.payload.userName,
        userId: action.payload.userId,
        email: action.payload.email,
      };
    case types.UPDATE_TECHNOLOGIES: 
      return {
        ...state,
        technologies: action.payload.technologies
      };
    case types.TEST: 
      return {
        ...state,
        firstName: 'Jim',
        lastName: 'Jones',
        userName: 'JJ',
        userId: '69420',
        email: 'JJ@aol.com',
      };
    default:
      console.log('default is being called')
      return state;
  }
}

export default reducer;
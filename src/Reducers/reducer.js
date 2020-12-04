export const types = {
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
  UPDATE_TECHNOLOGIES: 'UPDATE_TECHNOLOGIES',
  TEST: 'TEST'
}

const initialState = {
  firstName: 'Guest',
  lastName: 'Guest',
  userName: 'guest',
  userId: '5',
  email: 'guest@guest.com',
  technologies: [],
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.UPDATE_USER_INFO:
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
        technologies: action.payload
      };
    case types.TEST: 
      return {
        ...state,
        firstName: 'Jim',
        lastName: 'Jones',
        userName: 'JJ',
        userId: '5',
        email: 'JJ@aol.com',
      };
    default:
      return state;
  }
}

export default reducer;
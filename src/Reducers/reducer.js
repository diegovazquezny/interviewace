export const types = {
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
  UPDATE_TECHNOLOGIES: 'UPDATE_TECHNOLOGIES',
  TEST: 'TEST',
  DELETE_NOTE: 'DELETE_NOTE'
}

const initialState = {
  firstName: 'Guest',
  lastName: 'Guest',
  userName: null,
  userId: '5',
  email: 'guest@guest.com',
  pciture: '',
  technologies: [],
  authenticated: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.UPDATE_USER_INFO:
      //console.log(action.payload)
      //console.log('first name', action.payload.firstname)
      return {
        ...state,
        firstName: action.payload.firstname,
        lastName: action.payload.lastname,
        userName: action.payload.username,
        userId: action.payload.userId,
        email: action.payload.email,
        picture: action.payload.picture,
        authenticated: true
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
    case types.DELETE_NOTE:
      const { bulletId } = action.payload;
      const techObj = {...state.technologies};
      for (let topic in techObj) {
        for (let i = 0; i < techObj[topic].length; i += 1) {
          if (bulletId === techObj[topic][i].id) {
            techObj[topic].splice(i, 1);
            return {
              ...state,
              technologies: techObj
            }
          }
        }
      }
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default reducer;
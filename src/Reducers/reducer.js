export const types = {
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
  UPDATE_TECHNOLOGIES: 'UPDATE_TECHNOLOGIES',
  DELETE_NOTE: 'DELETE_NOTE'
}

const initialState = {
  firstName: '',
  lastName: '',
  userName: '',
  userId: '',
  email: '',
  picture: '',
  technologies: [],
  authenticated: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.UPDATE_USER_INFO:
      const { userData } = action.payload;  
      console.log(userData);
      console.log('first name', action.payload.firstname)
      return {
        ...state,
        firstName: userData.firstname,
        lastName: userData.lastname,
        userName: userData.username,
        userId: userData.userId,
        email: userData.email,
        picture: userData.picture,
        authenticated: true
      };
    case types.UPDATE_TECHNOLOGIES:
      return {
        ...state,
        technologies: action.payload
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
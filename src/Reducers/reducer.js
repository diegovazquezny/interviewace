export const types = {
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
  UPDATE_TECHNOLOGIES: 'UPDATE_TECHNOLOGIES',
  DELETE_NOTE: 'DELETE_NOTE',
  ALL_CATEGORIES: 'ALL_CATEGORIES',
  MAKE_NEW_NOTE: 'MAKE_NEW_NOTE'
}

const initialState = {
  firstName: '',
  lastName: '',
  userName: '',
  userId: '',
  email: '',
  picture: '',
  technologies: {},
  authenticated: false,
  categories: [],
  newNote: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.UPDATE_USER_INFO:
      const { userData } = action.payload;  
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
      const { bulletId, techName } = action.payload;
      const techObj = {...state.technologies};
      for (let i in techObj[techName]) {
        if (techObj[techName][i].id === bulletId) {
          techObj[techName].splice(i, 1);
        }
      }
      return {
        ...state,
        technologies: techObj
      };

    case types.ALL_CATEGORIES:
      const { categories } = action.payload;
      const categoriesObject = categories.reduce((object, category) => {
        const { category_name } = category;
        object[category_name] = {
          categoryID: category.category_id,
          technologies: []
        }
        return object;
      }, {});
      return {
        ...state,
        categories: categoriesObject
      };

    case types.MAKE_NEW_NOTE:
      return {
        ...state,
        newNote: true
      };
      
    default:
      return state;
  }
}

export default reducer;
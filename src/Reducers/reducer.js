export const types = {
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
  UPDATE_TECHNOLOGIES: 'UPDATE_TECHNOLOGIES',
  DELETE_NOTE: 'DELETE_NOTE',
  ALL_CATEGORIES: 'ALL_CATEGORIES'
}

const initialState = {
  firstName: '',
  lastName: '',
  userName: '',
  userId: '',
  email: '',
  picture: '',
  technologies: [],
  authenticated: false,
  categories: []
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
    case types.ALL_CATEGORIES:
      const { categories } = action.payload;
      console.log(categories);
      const categoriesObject = categories.reduce((object, category) => {
        const { category_name } = category;
        object[category_name] = {
          categoryID: category.category_id,
          technologies: []
        }
        return object;
      }, {});
      console.log(categoriesObject);
      return {
        ...state,
        categories: categoriesObject
      };
    default:
      return state;
  }
}

export default reducer;
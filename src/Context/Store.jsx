import React, {useReducer} from "react";
import initialState from './initialState';
import reducer from '../reducers/reducer';
import UserContext from './UserContext';
const Store = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}

export default Store;

import React, { useState, useReducer } from "react";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader/root';
import MainContainer from './Components/Main/MainContainer';
import UserContext from './Context/UserContext';
import reducer from './Reducers/reducers';
import initialState from './Context/initialState';


const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#2e050d',
    },
    secondary: {
      main: '#2a4cab',
    },
  },
});


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('initial state', state);
  const [userId, setUserId] = useState(NaN);
  return (
    <>
      
        <ThemeProvider theme={mainTheme}>
          <MainContainer/>
        </ThemeProvider>
      
    </>
  );
}

export default hot(App);

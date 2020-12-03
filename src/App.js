
import React from "react";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader/root';
import StudyContainer from './Components/Study/StudyContainer';
import LandingPage from './Components/LandingPage/LandingPage';
import AddTechnology from './Components/AddTechnology/AddTechnology';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

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
  return (
    <>
      <ThemeProvider theme={mainTheme}>
          <Router>
            <Switch>
              <Route 
                exact path="/"
                component={LandingPage} 
              />
              <Route 
                exact path="/add-tech"
                component={AddTechnology} 
              />
              <Route 
                exact path="/study"
                component={StudyContainer} 
              />
            </Switch>
          </Router>
      </ThemeProvider>
    </>
  );
}

export default hot(App);

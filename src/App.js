
import React from "react";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader/root';
import Study from './Pages/Study';
import LandingPage from './Pages/LandingPage';
import AddTechnology from './Pages/AddTechnology';
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
                component={Study} 
              />
            </Switch>
          </Router>
      </ThemeProvider>
    </>
  );
}

export default hot(App);

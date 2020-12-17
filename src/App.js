import React, { useState } from "react";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Study from './Pages/Study';
import LandingPage from './Pages/LandingPage';
import AddTechnology from './Pages/AddTechnology';
import Redesign from './Pages/Redesign';
import { connect } from 'react-redux';
import * as actions from '../src/actions/actions';
import Loading from './Components/Loading';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#0f7947',
    },
    secondary: {
      main: '#2a4cab',
    },
  },
  props: {
    MuiTypography: {
      variantMapping: {
        h1: 'h1',
        body2: 'h2'    
      }
    }
  }
});

const mapDispatchToProps = dispatch => ({
  updateUserInfo: (data) => dispatch(actions.updateUserInfo(data)),
});

const mapStateToProps = ({
  reducer: { userName, picture, email }
}) => ({ userName, picture, email });

function App(props) {
  const [checkSession, setCheckSession] = useState(false);
  const api_uri = process.env.NODE_ENV !== 'development' 
    ? 'https://interview-ace.herokuapp.com'
    : '';

  fetch(api_uri + '/authentication/session')
    .then(res => res.json())
    .then(res => {
      const { user }  = res;
      if (user) {
        props.updateUserInfo({
          type: 'UPDATE_USER_INFO',
          userData: {
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            picture: user.image_url,
            userId: user.user_id,
            authenticated: true
          }
        });
      }
      setCheckSession(true);
    })
    .catch(err => console.log(err));

  return (
    <>
    {
      !checkSession && <Loading/>
    }
    {
      checkSession &&
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
              <Route 
                exact path="/redesign"
                component={Redesign} 
              />
            </Switch>
          </Router>
      </ThemeProvider>
    
    }
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, {useReducer} from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import AddTechnology from './Components/AddTechnology/AddTechnology';
import initialState from './Context/initialState';
import reducer from './Reducers/reducers';
import UserContext from './Context/UserContext';

import "./styles.css";

const app = document.getElementById("app");
const domain = 'dev-71d4ng-s.us.auth0.com';
const id = '2Dy4ypXUbgqELIa7ccHaH7WnkF6oQfMj';
const [state, dispatch] = useReducer(reducer, initialState);

ReactDOM.render(
    <Auth0Provider
      // domain={process.env.DOMAIN}
      // clientId={process.env.CLIENT_ID}
      domain={domain}
      clientId={id}
      redirectUri={window.location.origin}
    >
      <Router>
        <Switch>
        <UserContext.Provider value={[state, dispatch]}>
          <Route exact path="/" component={App} />
          <Route exact path="/add-tech" component={AddTechnology} />
          </UserContext.Provider>
        </Switch>
      </Router>
    </Auth0Provider>, app
);

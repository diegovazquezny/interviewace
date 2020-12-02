import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'react-redux';
import { Auth0Provider } from "@auth0/auth0-react";
import store from './store';

import "./styles.css";

const app = document.getElementById("app");
const domain = 'dev-71d4ng-s.us.auth0.com';
const id = '2Dy4ypXUbgqELIa7ccHaH7WnkF6oQfMj';

ReactDOM.render(
    <Auth0Provider
      // domain={process.env.DOMAIN}
      // clientId={process.env.CLIENT_ID}
      domain={domain}
      clientId={id}
      redirectUri={window.location.origin}
    >
      <Provider store={store}>
        <App/>
      </Provider>
    </Auth0Provider>, app
);

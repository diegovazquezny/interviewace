import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'react-redux';
import { Auth0Provider } from "@auth0/auth0-react";
import APIURL from './constants/APIURL';
import store from './store';
import "./styles.css";

const audience = "https://dev-71d4ng-s.us.auth0.com/api/v2/";
const app = document.getElementById("app");

fetch(APIURL + '/authentication/login')
.then(res => res.json())
.then(res => {
  const { domain } = res.oauth;
  const { clientId } = res.oauth;
  ReactDOM.render(
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      audience={audience}
      redirectUri={window.location.origin}
    >
      <Provider store={store}>
        <App/>
      </Provider>
    </Auth0Provider>, app
  );
})
.catch(err => console.log(err));

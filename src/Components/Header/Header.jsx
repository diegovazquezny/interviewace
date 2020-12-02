import React, { useContext } from 'react';
import LoginButton from './LoginButton';
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import LoggedIn from './LoggedIn';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import UserContext from '../../Context/UserContext';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '70px',
      backgroundColor: theme.palette.primary.main,
      margin: '0px',
      padding: '0px',
      boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)'
    },
    logo: {
      color: 'white',
      marginLeft: '40px',
      fontFamily: 'Arial, Helvetica, sans-serif',
      textDecoration: 'none'
    },
    rightContent: {
      marginRight: '200px'
    }
  }),
);

const Header = () => {
  // TODO: change back to const
  const [state, dispatch] = useContext(UserContext);
  let { user, isAuthenticated } = useAuth0();
  const classes = useStyles();
  console.log('before fetch to /login', state);
  if (isAuthenticated && !state.userId ) { // 
    console.log('fetch');
    fetch('/authentication/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: 'UPDATE_USER_INFO',
          payload: {
            firstName: user.given_name,
            lastName: user.family_name,
            userName: user.nickname,
            userId: data.sessionId,
            email: user.email
          }
        });
        console.log('this is state now', state);
        return data;
      })
      .catch(err => console.log(err));
  }
  //isAuthenticated = true;
  return (
    <div className={classes.container}>
      <Link className={classes.logo} to={'/'}>
        <h1>Interview Ace</h1>
      </Link>
      { isAuthenticated
        ? <LoggedIn style={{paddingRight: '10px'}} />
        : <LoginButton style={{paddingRight: '10px'}} />
      }
    </div>
  );
}

export default Header;

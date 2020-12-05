import React from 'react';
import LoginButton from './LoginButton';
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import LoggedIn from './LoggedIn';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../Actions/Actions';

const mapDispatchToProps = dispatch => ({
  updateUserInfo: (data) => dispatch(actions.updateUserInfo(data)),
  test: () => dispatch(actions.test())
});

const mapStateToProps = ({
  reducer: { userName }
}) => ({ userName });

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '70px',
      backgroundColor: 'green',
      margin: '0px',
      padding: '0px',
      boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)'
    },
    logo: {
      color: 'white',
      marginLeft: '40px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.75em',
        marginLeft: '10px',
      },
      fontFamily: 'Arial, Helvetica, sans-serif',
      textDecoration: 'none'
    },
    rightContent: {
      marginRight: '200px'
    }
  }),
);

const Header = (props) => {
  // TODO: change back to const
  let { user, isAuthenticated } = useAuth0();
  console.log('is authenticated ->', isAuthenticated);
  const classes = useStyles();
  const api_uri = process.env.NODE_ENV !== 'development' 
    ? 'https://interview-ace.herokuapp.com'
    : '';

  if (isAuthenticated) {
    console.log('Authenticated! ->', isAuthenticated); 
    fetch(api_uri + '/authentication/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept" : "application/json",
      },
      mode: "cors",
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        props.updateUserInfo({
          type: 'UPDATE_USER_INFO',
          payload: {
            firstName: user.given_name,
            lastName: user.family_name,
            userName: user.nickname,
            userId: data.sessionId,
            email: user.email
          }
        });
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
import React, { useState } from 'react';
import LoginButton from './LoginButton';
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import LoggedIn from './LoggedIn';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import APIURL from '../../constants/APIURL';

const mapDispatchToProps = dispatch => ({
  updateUserInfo: (data) => dispatch(actions.updateUserInfo(data)),
});

const mapStateToProps = ({
  reducer: { userName, picture, authenticated }
}) => ({ userName, picture, authenticated });

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '70px',
      backgroundColor: '#4b739a',
      margin: '0px',
      padding: '0px',
      boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
      top: '0',
      // position: 'fixed'
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
  let { user, isAuthenticated } = useAuth0();
  if (props.authenticated) isAuthenticated = true;
  const [isUserAuth, setIsUserAuth] = useState(false);
  const classes = useStyles();

  if (isAuthenticated && !isUserAuth && !props.authenticated) {
    fetch(APIURL + '/authentication/login', {
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
           userData: {
             firstname: user.given_name,
             lastname: user.family_name,
             username: user.nickname,
             userId: data.userId,
             email: user.email,
             picture: user.picture,
           }
         });
         setIsUserAuth(true);
       })
       .catch(err => console.log(err));
  }
  return (
    <div className={classes.container}>
      <Link className={classes.logo} to={'/'}>
        <h1>Tech Notes</h1>
      </Link>
      { isAuthenticated
        ? <LoggedIn validSession={isAuthenticated} style={{paddingRight: '10px'}} />
        : <LoginButton style={{paddingRight: '10px'}} />
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
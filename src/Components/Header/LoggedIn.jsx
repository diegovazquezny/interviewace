import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from '@material-ui/core/styles';
import { Menu, MenuItem } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
  ({
    container: {
      display: 'flex',
      flexDirection: 'row',
      minWidth: '0px',
      justifyContent: 'space-between',
      marginRight: '40px'
    },
    favorites: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      color: 'white',
      cursor: 'pointer',
      fontSize: '18px',
      textDecoration: 'none',
    },
    img: {
      height: '50px',
      borderRadius: '30px',
      marginLeft: '10px'
    }
  }),
);


const LoggedIn = (props) => {
  const { user } = useAuth0();
  const { logout } = useAuth0();
  // TODO: change back
  //const { nickname, picture } = user;
  let nickname = 'Diego';
  let picture = '';
  const classes = useStyles();
  const history = useHistory();
  
  const logoutUser = (e) => {
    logout({ returnTo: window.location.origin })
    console.log('logout');
  }
  
  const DropDownMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <p
          className={classes.favorites}
          onClick={handleClick}
        >
          {nickname}
        </p>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={anchorEl ? true: false }
          onClose={handleClose}
        >
          <MenuItem onClick={logoutUser}>Logout</MenuItem>
          <MenuItem onClick={()=>history.push('/add-tech')}>add a technology</MenuItem>
          <MenuItem onClick={()=>history.push('/study')}>study</MenuItem>
        </Menu>
      </>
    );
  }

  return (
    <div className={classes.container}>
      <DropDownMenu />
      <img src={picture} className={classes.img}/>
      </div>
  );
}

export default LoggedIn;

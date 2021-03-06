import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from '@material-ui/core/styles';
import { Menu, MenuItem } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) =>
  ({
    container: {
      display: 'flex',
      flexDirection: 'row',
      minWidth: '0px',
      justifyContent: 'space-between',
      marginRight: '40px'
    },
    username: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      color: 'white',
      cursor: 'pointer',
      fontSize: '18px',
      textDecoration: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    img: {
      height: '50px',
      borderRadius: '30px',
      marginLeft: '10px'
    }
  }),
);

const mapStateToProps = ({
  reducer: { userName, picture, authenticated }
}) => ({ userName, picture, authenticated });

const LoggedIn = (props) => {
  const { user } = useAuth0();
  const { logout } = useAuth0();
  const nickname = props.userName;
  const picture = props.picture;
  const classes = useStyles();
  const history = useHistory();
  
  const logoutUser = (e) => {
    document.cookie = 'ssid' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    logout({ returnTo: window.location.origin })
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
          className={classes.username}
          onClick={handleClick}
        >
          {nickname}
        </p>
        <img src={picture} className={classes.img} onClick={handleClick}/>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={anchorEl ? true: false }
          onClose={handleClose}
        >
          <MenuItem onClick={logoutUser}>Logout</MenuItem>
          {/* <MenuItem onClick={()=>history.push('/add-tech')}>add a technology</MenuItem>
          <MenuItem onClick={()=>history.push('/study')}>study</MenuItem>
          <MenuItem onClick={()=>history.push('/redesign')}>redesign</MenuItem> */}
        </Menu>
      </>
    );
  }

  return (
    <div className={classes.container}>
      <DropDownMenu />
    </div>
  );
}

export default connect(mapStateToProps, null)(LoggedIn);
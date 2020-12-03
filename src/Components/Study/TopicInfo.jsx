import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: '10px'
    },
    top: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    btn: {
      borderRadius: '50%',
      height: '30px',
      width: '30px'
    }
  }),
);

const text = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna 
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
  ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  Duis aute irure dolor in reprehenderit in voluptate velit 
  esse cillum dolore eu fugiat nulla pariatur. Excepteur 
  sint occaecat cupidatat non proident, sunt in culpa qui 
  officia deserunt mollit anim id est laborum.
`;

// fetch request to get detailed info about topic

const TopicInfo = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <h3>{props.currentTopic}</h3>
        <button className={classes.btn} onClick={props.handleCloseButton}>X</button>  
      </div> 
      <div className={classes.info}>
        <p>{text}</p>
      </div>   
    </div>
  );
}

export default TopicInfo;
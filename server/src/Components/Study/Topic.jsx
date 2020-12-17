import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100px',
      height: '50px',
      border: '1px solid black',
      borderRadius: '10px',
      padding: '10px',
      margin: '5px',
      cursor: 'pointer',
      backgroundColor: '#47d66d'
    },
  }),
);

const Topic = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root} onClick={props.handleClick(props.name)}>
      {props.name}  
    </div>
  );
}

export default Topic;
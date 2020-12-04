import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    text: {
      color: 'red'  
    }
  }),
);

const EditorError = (props) => {
  const classes = useStyles();
  return (
    <h4 className={classes.text}>
      Notes field cannot be empty. Please enter your notes.
    </h4>
  );
}

export default EditorError;
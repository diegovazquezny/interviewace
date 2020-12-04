import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    text: {
      color: 'red'  
    }
  }),
);

const SearchFieldError = (props) => {
  const classes = useStyles();
  return (
    <h4 className={classes.text}>
      Search field cannot be empty. Please enter in a technology.
    </h4>
  );
}

export default SearchFieldError;
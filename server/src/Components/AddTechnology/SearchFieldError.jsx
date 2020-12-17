import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    text: {
      color: 'red',
    }
  }),
);

const SearchFieldError = (props) => {
  const classes = useStyles();
  return (
    <h5 className={classes.text}>
      Please enter in a technology.</h5>
  );
}

export default SearchFieldError;
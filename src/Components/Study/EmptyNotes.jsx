import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
    },
  }),
);

const EmptyNotes = (props) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <h1>You have no saved notes</h1>
      <Button
        className={classes.btn}
        onClick={() => history.push('/add-tech') }
        variant="contained"
        size="small"
        color="secondary"
      >
        Create Note
      </Button>
    </>
  );
}

export default EmptyNotes;
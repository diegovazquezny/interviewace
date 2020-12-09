import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
    },
  }),
);

const EmptyNotes = (props) => {
  const classes = useStyles();
  return (
    <div>
      <h1>Select a technology to see all available notes</h1>        
    </div>
  );
}

export default EmptyNotes;
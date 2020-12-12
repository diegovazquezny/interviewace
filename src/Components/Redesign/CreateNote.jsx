import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      width: '95%',
      borderRadius: '4px',
      marginTop: '5px'
    },
  }),
);

const CreateNote = (props) => {
  const classes = useStyles();
  return (
    <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        endIcon={<PostAddIcon/>}
      >
        New Note
    </Button>
  );
}

export default CreateNote;
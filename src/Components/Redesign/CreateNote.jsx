import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      width: '95%',
      borderRadius: '4px',
      marginTop: '5px'
    },
  }),
);

const mapDispatchToProps = dispatch => ({
  makeNewNote: (data) => dispatch(actions.makeNewNote(data)),
});


const CreateNote = (props) => {
  const classes = useStyles();
  const handleClick = (e) => {
    props.makeNewNote(true);
  }
  return (
    <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        endIcon={<PostAddIcon/>}
        onClick={handleClick}
      >
        New Note
    </Button>
  );
}

export default connect(null, mapDispatchToProps)(CreateNote);
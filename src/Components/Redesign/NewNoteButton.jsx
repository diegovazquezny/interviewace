import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import * as uiActions from '../../actions/uiActions';

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      width: '250px',
      borderRadius: '4px',
      marginTop: '5px'
    },
  }),
);

const mapDispatchToProps = dispatch => ({
  makeNewNoteOLD: (data) => dispatch(actions.makeNewNote(data)),
  changeMain: (data) => dispatch(uiActions.changeMain(data)),
});


const NewNoteButton = (props) => {
  const classes = useStyles();
  const handleClick = (e) => {
    props.changeMain('new note');
    props.makeNewNoteOLD(true);
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

export default connect(null, mapDispatchToProps)(NewNoteButton);
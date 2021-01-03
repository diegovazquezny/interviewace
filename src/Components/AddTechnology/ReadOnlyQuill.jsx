import React, { useState, useEffect, useRef } from "react";
import ReactQuill from 'react-quill';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import APIURL from '../../constants/APIURL';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import Likes from '../Redesign/Likes';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) =>
createStyles({
    root: {
      width: 'auto',
      padding: '0px 20px 0px 20px'
    },
    btnWrapper: {
      display: 'flex',
      justifyContent: 'center',
      padding: '0px 20px 0px 20px',
      marginTop: '10px' 

    },
    btnContainer: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    quill: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        minHeight: '5vh',
      },
    },
    submitBtn: {
      marginRight: '10px',
      marginBottom: '10px'
    },
    topBar: {
      display: 'flex'
    },
    title: {
      justifySelf: 'center'
    }
  }),
);

const mapDispatchToProps = dispatch => ({
  deleteNote: (data) => dispatch(actions.deleteNote(data)),
});
  
const mapStateToProps = ({
  reducer: { userId }
}) => ({ userId });

const Quill = ({ userId, value, bulletId, deleteNote, techName }) => {
  const [noteValue, setNoteValue] = useState(value);
  const [readOnlyQuill, setReadOnlyQuill] = useState(true);
  const [quillTheme, setQuillTheme] = useState('bubble');
  const [openWarning, setOpenWarning] = useState(false);
  const [openDeleteSuccess, setOpenDeleteSuccess] = useState(false);
  const [openSaveSuccess, setOpenSaveSuccess] = useState(false);
  const classes = useStyles();
  const quillRef = useRef();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenDeleteSuccess(false);
    setOpenWarning(false);
    setOpenSaveSuccess(false);
  };

  const handleSaveClick = () => {
    console.log('post request', bulletId, userId, noteValue);
    fetch(APIURL + '/technology/notes', {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        notes: noteValue,
        bulletId: bulletId            
      })
    })
      .then(res => res.json())
      .then(() => {
        setReadOnlyQuill(!readOnlyQuill);
        setOpenSaveSuccess(true);
      })
      .catch(err => console.log(err));
  }

  const handleEditClick = () => setReadOnlyQuill(!readOnlyQuill);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete?')) { 
      fetch(APIURL + '/technology/notes', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept" : "application/json",
        },
        body: JSON.stringify({
          userId,
          bulletId
        }),
      })
        .then(res => res.json())
        .then(data => {
          //const { success } = data;
          setOpenDeleteSuccess(true);
          deleteNote({bulletId, techName});
          // trigger a rerender with the current notes (not deleted notes)
        })
        .catch(err => console.log(err));
    }       
  } 

  useEffect(() =>{
    if (!readOnlyQuill) setQuillTheme('snow');
    if (readOnlyQuill) setQuillTheme('bubble');
  },[readOnlyQuill]);

  return (
    <div className={classes.root}>
      <Paper>
        <ReactQuill
          ref={quillRef} 
          className={classes.quill} 
          theme={quillTheme}
          value={noteValue} 
          onChange={setNoteValue}
          readOnly={readOnlyQuill}
          />
        <div className={classes.btnContainer}>
          <Likes/>
        { readOnlyQuill &&
          <div>
            <Button
                className={classes.submitBtn} 
                onClick={handleEditClick}
                variant="contained"
                size="small"
                color="secondary"
                style={{display: userId ? 'initial' : 'none'}}
            >
              Edit
            </Button>
            <Button
                className={classes.submitBtn} 
                onClick={handleDelete}
                variant="contained"
                size="small"
                color="secondary"
                style={{display: userId ? 'intial' : 'none'}}
            >
              Delete
            </Button>
          </div>
        }
        { !readOnlyQuill && 
          <div>
            <Button
              className={classes.submitBtn} 
              onClick={handleEditClick}
              variant="contained"
              size="small"
              color="secondary"
              style={{display: userId ? 'intial' : 'none'}}
            >
              Go Back
            </Button>
            <Button
              className={classes.submitBtn} 
              onClick={handleSaveClick}
              variant="contained"
              size="small"
              color="secondary"
              style={{display: userId ? 'intial' : 'none'}}
            >
              Save
            </Button>
            <Button
              className={classes.submitBtn} 
              onClick={handleDelete}
              variant="contained"
              size="small"
              color="secondary"
              style={{display: userId ? 'intial' : 'none'}}
            >
              Delete
            </Button>
          </div>
        }
        </div>
      </Paper>
      <Snackbar open={openWarning} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          You already saved this note!
        </Alert>
      </Snackbar>
      <Snackbar open={openDeleteSuccess} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          The note is deleted!
        </Alert>
      </Snackbar>
      <Snackbar open={openSaveSuccess} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          The edit is saved!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Quill);
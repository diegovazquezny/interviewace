import React, { useState } from "react";
import ReactQuill from 'react-quill';
import { Button } from '@material-ui/core';
import 'react-quill/dist/quill.snow.css';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import NewNoteInfoForm from '../AddTechnology/NewNoteInfoForm';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import APIURL from '../../constants/APIURL';
/* TODO
  user needs to enter in tech name and category/tags
*/
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      alignSelf: 'center',
      [theme.breakpoints.down('sm')]: {
        width: '100vw',
      },
      [theme.breakpoints.up('md')]: {
        width: '100vw'
      },
      [theme.breakpoints.up('lg')]: {
        width: '70vw'
      },
    },
    btnWrapper: {
      display: 'flex',
      justifyContent: 'center',
      padding: '0px 20px 0px 20px',
      marginTop: '10px' 

    },
    quill: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        minHeight: '30vh',
      },
    },
    searchBtn: {
      marginLeft: '10px'
    },
    submitBtn: {
      marginRight: '10px'
    }
  }),
);

const mapStateToProps = ({
  reducer: { userId }
}) => ({ userId });

const Quill = (props) => {
  const [value, setValue] = useState('');
  const [noteInfo, setNoteInfo] = useState({});
  const [savedNote, setSavedNote] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [readOnlyQuill, setReadOnlyQuill] = useState(false);
  const [currentBulletId, setCurrentBulletId] = useState(NaN);
  const classes = useStyles();

  const handleClick = () => {
    // edit bullet id
    fetch(APIURL + '/technology/notes', {
      method: currentBulletId ? 'PUT' : 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        userId: props.userId,
        notes: value,
        noteInfo: noteInfo,
        bulletId: currentBulletId            
      })
    })
      .then(res => res.json())
      .then(data => {
        // TODO snackbar to show it was saved
        // switch button to edit
        setCurrentBulletId(data.bulletId);
        setSavedNote(true);
        setOpenSuccess(true);
        setReadOnlyQuill(true);
      })
      .catch(err => console.log(err));  
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  const handleEdit = (e) => {
    setSavedNote(false);
    setReadOnlyQuill(false);
    //
  };

  const handleNewNote = (e) => {
    setSavedNote(false);
    setValue('');
    setReadOnlyQuill(false);
    setCurrentBulletId(NaN);
    // TODO: clear topic name and category
  };

  const getInfo = (info) => setNoteInfo(info);

  return (
    <div className={classes.root}>
      <NewNoteInfoForm getInfo={getInfo} topicName={''}/>
      <ReactQuill 
        className={classes.quill} 
        theme='snow'
        readOnly={readOnlyQuill}
        value={value} 
        onChange={setValue}
        style={{minHeight: '5vh'}}
      />
      <div className={classes.btnWrapper}>
      {
        !savedNote ? 
          <Button
              className={classes.submitBtn} 
              onClick={handleClick}
              variant="contained"
              size="small"
              color="primary"
          >
            SAVE
          </Button>
        : <>
          <Button
            className={classes.submitBtn} 
            onClick={handleEdit}
            variant="contained"
            size="small"
            color="secondary"
          >
            EDIT
          </Button>
          <Button
            className={classes.submitBtn} 
            onClick={handleNewNote}
            variant="contained"
            size="small"
            color="primary"
          >
            NEW NOTE
          </Button></>
      }
      </div>
      <Snackbar open={openSuccess} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          The note is saved!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default connect(mapStateToProps, null)(Quill);
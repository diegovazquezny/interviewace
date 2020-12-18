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

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: 'auto',
      padding: '0px 20px 0px 20px'
    },
    btnWrapper: {
      display: 'flex',
      justifyContent: 'center',
      padding: '0px 20px 0px 20px'
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
        minHeight: '40vh',
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

const mapStateToProps = ({
  reducer: { userId }
}) => ({ userId });

const Quill = (props) => {
  const [value, setValue] = useState(props.value);
  const [readOnlyQuill, setReadOnlyQuill] = useState(true);
  const [quillTheme, setQuillTheme] = useState('bubble');
  const [openWarning, setOpenWarning] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const { bulletId, userId } = props;
  const classes = useStyles();
  const quillRef = useRef();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenWarning(false);
  };

  const handleSaveClick = () => {
    console.log('post request', bulletId, userId);
    fetch(APIURL + '/technology/public-note', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        userId: props.userId,
        bulletId          
      })
    })
    .then(res => res.json())
    .then(data => {
      const { success } = data;
      if (!success) setOpenWarning(true);
      else setOpenSuccess(true);
    })
    .catch(err => console.log(err));
  }

  const handleEditClick = () => {
    setReadOnlyQuill(!readOnlyQuill);
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
          value={value} 
          onChange={setValue}
          readOnly={readOnlyQuill}
          />
        <div className={classes.btnContainer}>
          <Likes/>
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
        </div>
      </Paper>
      <Snackbar open={openWarning} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          You already saved this note!
        </Alert>
      </Snackbar>
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          The note is saved!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default connect(mapStateToProps, null)(Quill);
import React, { useState, useEffect, useRef } from "react";
import ReactQuill from 'react-quill';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import APIURL from '../../constants/APIURL';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Likes from '../Redesign/Likes';

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

const Quill = (props) => {
  const [value, setValue] = useState(props.value);
  const [readOnlyQuill, setReadOnlyQuill] = useState(true);
  const [quillTheme, setQuillTheme] = useState('bubble');
  const classes = useStyles();
  const quillRef = useRef();
  
  const handleSaveClick = () => {
    //console.log('post request');
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
          {/* <div className={classes.btnWrapper}> */}
            <Button
                className={classes.submitBtn} 
                onClick={handleSaveClick}
                variant="contained"
                size="small"
                color="secondary"
            >
              Save
            </Button>
            {/* <Button
                className={classes.submitBtn} 
                onClick={handleEditClick}
                variant="contained"
                size="small"
                color="secondary"
            >
              Edit
            </Button> */}
          {/* </div> */}
        </div>
      </Paper>
    </div>
  );
}

export default Quill;
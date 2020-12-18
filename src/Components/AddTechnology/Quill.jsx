import React, { useState } from "react";
import ReactQuill from 'react-quill';
import { Button } from '@material-ui/core';
import 'react-quill/dist/quill.snow.css';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import NewNoteInfoForm from '../AddTechnology/NewNoteInfoForm';
import { connect } from 'react-redux'
/* TODO
  user needs to enter in tech name and category/tags
*/
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
      padding: '0px 20px 0px 20px'
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
  const classes = useStyles();
  const api_uri = process.env.NODE_ENV !== 'development' 
    ? 'https://interview-ace.herokuapp.com'
    : '';
  
  const handleClick = () => {
    console.log(noteInfo);
    fetch(api_uri + '/technology/notes', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Bearer' : null
      },
      body: JSON.stringify({
        userId: props.userId,
        notes: value,
        noteInfo: noteInfo          
      })
    })
      .then(res => res.json())
      .then(data => {
        // TODO snackbar to show it was saved
        // switch button to edit
        if (data.success) props.completedNotes();
      })
      .catch(err => console.log(err));
  }

  const getInfo = (info) => setNoteInfo(info);

  return (
    <div className={classes.root}>
      <NewNoteInfoForm getInfo={getInfo}/>
      <ReactQuill 
        className={classes.quill} 
        theme="snow" 
        value={value} 
        onChange={setValue}
        style={{minHeight: '40vh'}}
      />
      <div className={classes.btnWrapper}>
        <Button
            className={classes.submitBtn} 
            onClick={handleClick}
            variant="contained"
            size="small"
            color="secondary"
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, null)(Quill);
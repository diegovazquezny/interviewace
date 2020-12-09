import React, { useState } from "react";
import ReactQuill from 'react-quill';
import { Button } from '@material-ui/core';
import 'react-quill/dist/quill.snow.css';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: 'auto',
      boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)'

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
        minHeight: '40vh',
      },
    },
    submitBtn: {
      margin: '0px 10px 10px 0px'
    }
  }),
);


const Quill = (props) => {
  const [value, setValue] = useState('');
  const classes = useStyles();
  const api_uri = process.env.NODE_ENV !== 'development' 
    ? 'https://interview-ace.herokuapp.com'
    : '';
  
  const handleClick = () => {
    console.log(props.bulletId);
    // fetch(api_uri + '/technology/notes', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type' : 'application/json'
    //   },
    //   body: JSON.stringify({
    //     userId: props.userId,
    //     notes: value,
    //     currentTech: props.currentTech          
    //   })
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     if (data.success) props.completedNotes();
    //   })
    //   .catch(err => console.log(err));
  }

  return (
    <div className={classes.root}>
      <h1>{props.currentTech}</h1>
      <ReactQuill 
        className={classes.quill} 
        theme="bubble" 
        value={props.value} 
        onChange={setValue}
        readOnly={true}
      />
      <div className={classes.btnWrapper}>
        <Button
            className={classes.submitBtn} 
            onClick={handleClick}
            variant="contained"
            size="small"
            color="secondary"
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default Quill;
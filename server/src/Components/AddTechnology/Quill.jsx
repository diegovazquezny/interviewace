import React, { useState } from "react";
import ReactQuill from 'react-quill';
import { Button } from '@material-ui/core';
import 'react-quill/dist/quill.snow.css';
import { makeStyles, createStyles } from '@material-ui/core/styles';

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
        minHeight: '40vh',
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


const Quill = (props) => {
  const [value, setValue] = useState('');
  const classes = useStyles();
  const api_uri = process.env.NODE_ENV !== 'development' 
    ? 'https://interview-ace.herokuapp.com'
    : '';
  
  const handleClick = () => {
    fetch(api_uri + '/technology/notes', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        userId: props.userId,
        notes: value,
        currentTech: props.currentTech          
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) props.completedNotes();
      })
      .catch(err => console.log(err));
  }

  return (
    <div className={classes.root}>
      <h1>{props.currentTech}</h1>
      <ReactQuill 
        className={classes.quill} 
        theme="snow" 
        value={value} 
        onChange={setValue}
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
        <Button
            className={classes.searchBtn}    
            onClick={props.backToSearch}
            variant="contained"
            size="small"
            color="secondary"
        >
          SEARCH
        </Button>
      </div>
    </div>
  );
}

export default Quill;
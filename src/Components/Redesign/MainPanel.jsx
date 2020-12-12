import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Quill from '../AddTechnology/Quill';
import APIURL from '../../constants/APIURL';
import ReadOnlyQuill from '../AddTechnology/ReadOnlyQuill';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    notesContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    titleWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%' 
    }
  }),
);

const MainPanel = (props) => {
  const classes = useStyles();
  const [showEditor, setShowEditor] = useState(false);
  const [notesArray, setNotesArray] = useState([]);

  useEffect(() => {
    if (props.currentTech) {
      fetch(APIURL + `/technology/all-notes-for-tech?q=${props.currentTech}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Accept" : "application/json",
          "Access-Control-Allow-Origin" : "*"
        },
        mode: "cors"
      })
      .then(res => res.json())
      .then(data => {
        const notesArray = data.technologies.map((note, i) => {
          return (
            <React.Fragment key={`k${i}`}>
              <ReadOnlyQuill value={note.bullet} bulletId={note.bullet_id}/>
              <hr/>
            </React.Fragment>
          );
        });
        setNotesArray(notesArray);
      })
      .then(()=> setShowEditor(true))
      .catch(err => console.log(err));
      
    }
  },[props.currentTech])

  return (
    <>
      { !showEditor 
          ? <div className={classes.titleWrapper}>
              <h1>Search for Notes or Create Your Own </h1>
            </div>
          : <>
              <div className={classes.notesContainer}>
                <h1 className={classes.title}>{props.currentTech}</h1> 
                {notesArray}
              </div>
            </>
      } 
    </>
  );
}

export default MainPanel;
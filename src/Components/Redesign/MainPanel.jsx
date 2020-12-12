import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Quill from '../AddTechnology/Quill';
import APIURL from '../../constants/APIURL';
import ReadOnlyQuill from '../AddTechnology/ReadOnlyQuill';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

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
    },
    title: {
      alignSelf: 'center'
    }
  }),
);

const mapStateToProps = ({
  reducer: { newNote }
}) => ({ newNote });

const MainPanel = (props) => {
  const classes = useStyles();
  const [showDefault, setShowDefault] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [notesArray, setNotesArray] = useState([]);
  const [showNewNote, setShowNewNote] = useState(false);

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
      .then(res => {
        setNotesArray([]);
        return res.json();
      })
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
        setShowDefault(false);
        setShowNewNote(false); 
      })
      .then(()=> setShowEditor(true))
      .catch(err => console.log(err));
      
    }
  },[props.currentTech])

  useEffect(()=> {
    if (showNewNote) {
      setShowDefault(false);
      setShowEditor(false);
    }
    if (props.newNote) {
      setShowDefault(false);
      setShowEditor(false);
      setShowNewNote(true); 
    }
  },[props.newNote])

  return (
    <>
      { showDefault &&
          <div className={classes.titleWrapper}>
            <h1>Search for Notes or Create Your Own </h1>
          </div> 
      }
      { showEditor &&  
          <div className={classes.notesContainer}>
            <h1 className={classes.title}>{props.currentTech}</h1> 
              {notesArray}
          </div>
      }
      {showNewNote && <Quill/>} 
    </>
  );
}

export default connect(mapStateToProps, null)(MainPanel);
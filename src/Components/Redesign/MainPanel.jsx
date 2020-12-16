import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Quill from '../AddTechnology/Quill';
import APIURL from '../../constants/APIURL';
import ReadOnlyQuill from '../AddTechnology/ReadOnlyQuill';
import { connect } from 'react-redux';

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
  reducer: { newNote, technologies },
  uiReducer: { showSavedNotes, mainPanel }
}) => ({ newNote, technologies, showSavedNotes, mainPanel });

const MainPanel = ({ currentTech, showSavedNotes, technologies, mainPanel }) => {
  const classes = useStyles();
  const [showDefault, setShowDefault] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [notesArray, setNotesArray] = useState([]);
  const [userSavedNotesArray, setUserSavedNotesArray] = useState([]);
  const [showNewNote, setShowNewNote] = useState(false);
  const [showUserSavedNotes, setShowUserSavedNotes] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (currentTech) {
      fetch(APIURL + `/technology/all-notes-for-tech?q=${currentTech}`, {
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
        setShowUserSavedNotes(false);  
      })
      .then(()=> setShowEditor(true))
      .catch(err => console.log(err)); 
    }
  },[currentTech])

  useEffect(()=> {
    const { techName } = showSavedNotes;
    if (showSavedNotes.display) {
      const clearSavedNotes = new Promise((resolve, reject) => {
        resolve(setUserSavedNotesArray([]));
      });
      clearSavedNotes.then(() => {
        const notesArray = technologies[techName].map((tech, i) => {
          return (
            <React.Fragment key={`k${i}`}>
              <ReadOnlyQuill value={tech.note} bulletId={tech.id}/>
              <hr/>
            </React.Fragment>
          );
        });
        setTitle(techName);
        setUserSavedNotesArray(notesArray); 
        setShowDefault(false);
        setShowEditor(false);
        setShowNewNote(false);
        setShowUserSavedNotes(true);  
      });
    }
  },[showSavedNotes.renders]);

  useEffect(() => {
    //console.log('MAIN PANEL +++++++>>>>>>', mainPanel);
    switch(mainPanel) {
      case 'new note':
        //console.log('main panel switch:', mainPanel);
        setShowDefault(false);
        setShowEditor(false);
        setShowUserSavedNotes(false); 
        setShowNewNote(true);
      case 'saved notes':
        //console.log('main panel switch:', mainPanel);
      case 'search':
        //console.log('main panel switch:', mainPanel);
      default:
        //console.log('default');
    }
  },[mainPanel]);

  return (
    <>
      { showDefault &&
          <div className={classes.titleWrapper}>
            <h1>Search for Notes or Create Your Own </h1>
          </div> 
      }
      { showEditor &&  
          <div className={classes.notesContainer}>
            <h1 className={classes.title}>{currentTech}</h1> 
              {notesArray}
          </div>
      }
      { showNewNote &&
        <div className={classes.notesContainer}>
          <Quill/> 
        </div> 
      }
      { showUserSavedNotes && 
        <div className={classes.notesContainer}>
          <h1 className={classes.title}>{title}</h1> 
            {userSavedNotesArray}
        </div> 
      }
    </>
  );
}

export default connect(mapStateToProps, null)(MainPanel);
import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Quill from '../AddTechnology/Quill';
import APIURL from '../../constants/APIURL';
import ReadOnlyQuill from '../AddTechnology/ReadOnlyQuill';
import { connect } from 'react-redux';
import MobileDefaultPage from './MobileDefaultPage';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        // height: 'calc(100vh - 70px - 56px)',
        height: 'fit-content',
        overFlow: 'scroll',
        width: '100vw'
      },
      // [theme.breakpoints.up('md')]: {
      //   minHeight: 'calc(100vh - 70px - 56px)',
      //   width: '100vw'
      // },
      // [theme.breakpoints.up('lg')]: {
      //   height: 'calc(100vh - 70px)',
      // },
      [theme.breakpoints.up('md')]: {
        height: 'calc(100vh - 70px)',
        display: 'flex',
        width: '100vw'
      }, 
    },
    notesContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    titleWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      textAlign: 'center' 
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

const MainPanel = ({ currentTech, showSavedNotes, technologies, mainPanel, getTechName }) => {
  const classes = useStyles();
  const [showDefault, setShowDefault] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [notesArray, setNotesArray] = useState([]);
  const [userSavedNotesArray, setUserSavedNotesArray] = useState([]);
  const [showNewNote, setShowNewNote] = useState(false);
  const [showUserSavedNotes, setShowUserSavedNotes] = useState(false);
  const [title, setTitle] = useState('');

  const makeSavedNotes = () => {
    const { techName } = showSavedNotes;
    console.log('tech arr', technologies[techName]);
    if (!technologies[techName]) return;
    const clearSavedNotes = new Promise((resolve, reject) => {
      resolve(setUserSavedNotesArray([]));
    });
    clearSavedNotes.then(() => {
      const notesArray = technologies[techName].map((tech, i) => {
        return (
          <React.Fragment key={`k${i}`}>
            <ReadOnlyQuill 
              value={tech.note} 
              bulletId={tech.id}
              techName={showSavedNotes.techName}
              />
            <hr/>
          </React.Fragment>
        );
      });
      setTitle(
        (technologies[techName].length === 0) 
          ? 'No notes found'
          : techName
      );
      setUserSavedNotesArray(notesArray); 
      setShowDefault(false);
      setShowEditor(false);
      setShowNewNote(false);
      setShowUserSavedNotes(true);  
    });    
  }


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
  },[currentTech, JSON.stringify(technologies)])

  useEffect(()=> {
    if (showSavedNotes.display) makeSavedNotes();
  },[showSavedNotes.renders, JSON.stringify(technologies)]);

  useEffect(() => {
    switch(mainPanel) {
      case 'home':
        //window.location.reload();
        setShowEditor(false);
        setShowNewNote(false);
        setShowUserSavedNotes(false);  
        setShowDefault(true);
        break;
      case 'add':
        //console.log('add new note');
      case 'new note':
        setShowDefault(false);
        setShowEditor(false);
        setShowUserSavedNotes(false); 
        setShowNewNote(true);
        break;
      case 'saved notes':
        //console.log('main panel switch:', mainPanel);
        break;
      case 'search':
        //console.log('main panel switch:', mainPanel);
        break;
      default:
        //console.log('default');
        break;
    }
  },[mainPanel]);



  return (
    <div className={classes.root}>
      { showDefault &&
          <div className={classes.titleWrapper}>
            <h1>Search for Notes or Create Your Own</h1>
            <MobileDefaultPage getTechName={getTechName}/>
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
    </div>
  );
}

export default connect(mapStateToProps, null)(MainPanel);
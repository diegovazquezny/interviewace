import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Header from '../Components/Header/Header';
import SearchForm from '../Components/AddTechnology/SearchForm';
import CompletedNotes from '../Components/AddTechnology/CompletedNotes';
import { connect } from 'react-redux';
import SearchFieldError from '../Components/AddTechnology/SearchFieldError';
import Quill from '../Components/AddTechnology/Quill';

const mapStateToProps = ({
  reducer: { userId }
}) => ({ userId });

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'    
    },
  }),
);

const AddTechnology = (props) => {
  const classes = useStyles();
  const [showEditor, setShowEditor] = useState(false);
  const [editorError, setEditorError] = useState(false);
  const [currentTech, setCurrentTech] = useState('');
  const [notesCompleted, setNotesCompleted] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSearch, setShowSearch] = useState(true);

  const addTech = (input) => {
    return () => {
      const techName = input.current.children[1].firstChild.defaultValue;
      if (!techName) setShowError(true);
      if (techName) {
        setShowEditor(true);
        setShowError(false);
        setShowSearch(!showSearch);
      }
      setCurrentTech(techName);
    }
  }

  const completedNotes = () => {
    setShowEditor(false);
    setNotesCompleted(true);
  }

  const addMoreNotes = () => {
    setNotesCompleted(false);
    setShowEditor(false);
    setShowSearch(true);
    // TODO: clear the technology in search
  }

  const showEditorError = () => {
    setEditorError(true);
  }

  const backToSearch = () => {
    setShowSearch(true);
    setShowEditor(false);
  }

  return (
    <>
      <Header />
      <div className={classes.root}>
        {showSearch && <SearchForm addTech={addTech}/>}
        {showError && <SearchFieldError/>}
        {editorError && <h1>Error</h1>}
        {
          showEditor 
          ? <Quill
              backToSearch={backToSearch}
              showEditorError={showEditorError} 
              currentTech={currentTech}
              completedNotes={completedNotes}
              userId={props.userId}
            /> 
          : ''
        }
        { 
          notesCompleted && 
          <CompletedNotes
            addMoreNotes={addMoreNotes}
          /> 
        }
      </div>
    </>
  );
}

export default connect(mapStateToProps, null)(AddTechnology);
import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Header from '../Header/Header';
import SearchForm from './SearchForm';
import Editor from './Editor';
import CompletedNotes from './CompletedNotes';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

// const mapDispatchToProps = dispatch => ({
//   updateUserInfo: (data) => dispatch(actions.updateUserInfo(data)),
//   test: () => dispatch(actions.test())
// });

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
  console.log('add tech', props);
  const classes = useStyles();
  const [showEditor, setShowEditor] = useState(false);
  const [currentTech, setCurrentTech] = useState('');
  const [notesCompleted, setNotesCompleted] = useState(true);
  const editorRef = useRef(null);

  const addTech = (input) => {
    return () => {
      const techName = input.current.children[1].firstChild.defaultValue;
      setCurrentTech(techName);
      console.log('editor ref', editorRef);
      if (editorRef.current.firstChild) editorRef.current.firstChild.innerHTML = ``;
    }
  }

  const completedNotes = () => {
    setShowEditor(false);
    setNotesCompleted(true);
  }

  const addMoreNotes = () => {
    setNotesCompleted(false);
    setShowEditor(true);
    // TODO: clear the technology in search
  }

  useEffect(() => {
    if (currentTech) {
      setShowEditor(true);
    }
  },[currentTech]);

  return (
    <>
      <Header />
      <div className={classes.root}>
        <SearchForm addTech={addTech}/>
        <div ref={editorRef}>
          {
            showEditor 
            ? <Editor 
                currentTech={currentTech}
                completedNotes={completedNotes}
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
      </div>
    </>
  );
}

export default connect(mapStateToProps, null)(AddTechnology);
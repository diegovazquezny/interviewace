import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import SearchForm from '../AddTechnology/SearchForm';
import SearchFieldError from '../AddTechnology/SearchFieldError'; 
import ReadOnlyQuill from '../AddTechnology/ReadOnlyQuill';

const mapStateToProps = ({
  reducer: { userId, technologies }
}) => ({ userId, technologies });

const mapDispatchToProps = dispatch => ({
  deleteNote: (data) => dispatch(actions.deleteNote(data)),
});

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      width: '70vw'
    },
    search: {
      width: 'auto',
      textAlign: 'center'
    },
    content: {
      width: '70%'
    }
  }),
);


const Browse = (props) => {
  const classes = useStyles();
  const [currentTech, setCurrentTech] = useState('');
  const [showError, setShowError] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  let [notesHTML, setNotesHTML] = useState([]);

  const api_uri = process.env.NODE_ENV !== 'development' 
    ? 'https://interview-ace.herokuapp.com'
    : '';

  const generateNotes = (array) => {
    console.log(array);
    return array.map((note, i) => {
      return (
        <div key={`k${i}`}>
          <ReadOnlyQuill value={note.bullet} bulletId={note.bullet_id}/>
          <hr/>
        </div>
      );
    }); 
  }

  const addTech = (input) => {
    return () => {
      const techName = input.current.children[1].firstChild.defaultValue;
      if (!techName) setShowError(true);
      if (techName) {
        setCurrentTech(techName);
        setShowEditor(true);
        setShowError(false);
      }
    }
  }

  useEffect(() => {
    console.log(currentTech);
    fetch(api_uri + `/technology/all-notes-for-tech?tech=${currentTech}`)
    .then(res => res.json())
    .then(data => {
      setNotesHTML(generateNotes(data.technologies));
    })
    .catch(err => console.log(err));
  },[currentTech])

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <SearchForm addTech={addTech}/>
        {showError && <SearchFieldError/>}
      </div> 
      <div className={classes.content}>
        {currentTech}
        {showEditor && notesHTML} 
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Browse);
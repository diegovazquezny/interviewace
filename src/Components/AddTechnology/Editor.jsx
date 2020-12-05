import React, { useState, useRef, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import EditorError from './EditorError';
import Quill from './Quill'; 

const mapStateToProps = ({
  reducer: { userId }
}) => ({ userId });

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      border: '1px solid black',
      width: '500px',
      padding: '20px'
    },
  }),
);

const Editor = (props) => {
  const classes = useStyles();
  let showError = false;
  const [click, setClick] = useState(true);
  
  useEffect(() => {
    console.log('click', click);
  }, [click]);

  const handleClick = () => {
    console.log(editor);
    setClick(!click);
    editor.save().then((outputData) => {
      console.log(outputData.blocks);
      if (outputData.blocks.length === 0) {
        props.showEditorError();
        showError = true;
        editorRef.current.innerHTML = '';
        return;
      }
      showError = false;
      fetch('/technology/notes', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          userId: props.userId,
          notes: outputData,
          currentTech: props.currentTech          
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log('success? ', data.success);
          if (data.success) props.completedNotes();
        })
        .catch(err => console.log(err));
       });
  }

  return (
    <>
      {showError && <EditorError/>}
      <Quill 
        userId={props.userId}
        currentTech={props.currentTech}
      />
    </>
  );
}

export default connect(mapStateToProps, null)(Editor);
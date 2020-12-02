import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import EditorJs from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import { Button } from '@material-ui/core';

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

  const editor = new EditorJs({
    holder: 'editorjs',
    tools: {
      header: {
        class: Header,
        inlineToolbar: ['link']
      },
      list: {
        class: List,
        inlineToolbar: [
          'link',
          'bold'
        ]
      },
      embed: {
        class: Embed,
        inlineToolbar: false,
        config: {
          services: {
            youtube: true,
            coub: true
          }
        }
      }
    }
  });

  const handleClick = () => {
    editor.save().then((outputData) => {
      fetch('/technology/notes', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
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
      <div className={classes.root} id={'editorjs'}/>
      <Button 
        onClick={handleClick}
        variant="contained"
        size="small"
        color="secondary"
      >
        CLICK ME
      </Button>
    </>
  );
}

export default Editor;
import React, { useRef, useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import parse from 'html-react-parser';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

const mapStateToProps = ({
  reducer: { technologies }
}) => ({ technologies });

const mapDispatchToProps = dispatch => ({
  deleteNote: (data) => dispatch(actions.deleteNote(data)),
});


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: '10px'
    },
    top: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    btn: {
      borderRadius: '50%',
      height: '30px',
      width: '30px'
    }
  }),
);

const TopicInfo = (props) => {
  const textWrapper = useRef();
  const [rerender, setRerender] = useState(true);
  const [num, setNum] = useState(1);
  const api_uri = process.env.NODE_ENV !== 'development' 
  ? 'https://interview-ace.herokuapp.com'
  : '';

  const handleDelete = (id) => {
    return () => {
      if (confirm('Are you sure you want to delete?')) {        
        fetch(api_uri + '/technology/notes?id=' + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json",
          },
          mode: "cors",
        })
        .then(res => res.json())
        .then(res => setRerender(!rerender))
        .then(res => {
          props.deleteNote({
            type: 'DELETE_NOTE',
            bulletId: id
          });
          return res;
        })
        .catch(err => console.log(err));
        props.deleteNote({
          type: 'DELETE_NOTE',
          bulletId: id
        });
      } 
    }
  } 

  const handleEdit = (id) => {
    return () => {
      console.log('edit note', id);
    }
  }

  const notes = props.technologies[props.currentTopic]
    .map((tech, i, arr) => {
      return (
        <div key={`k${i}`}>
          {parse(tech.note)}
          <Button onClick={handleEdit(tech.id, i)}>edit</Button>
          <Button onClick={handleDelete(tech.id, i)}>delete</Button>
          {(i !== arr.length - 1) && <hr/>}
        </div>)
    });

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <h3>{props.currentTopic}</h3>
        <button className={classes.btn} onClick={props.handleCloseButton}>X</button>  
      </div> 
      <div className={classes.info} ref={textWrapper}>
        {notes}
      </div>   
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicInfo);
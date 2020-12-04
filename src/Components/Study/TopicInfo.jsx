import React, { useRef, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const mapStateToProps = ({
  reducer: { technologies }
}) => ({ technologies });

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
  const text = '';

  useEffect(() => {
    props.technologies[props.currentTopic].forEach((note, i, arr) => 
      textWrapper.current.innerHTML += note + (i === arr.length - 1 ? '' : '<hr>')
    );
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <h3>{props.currentTopic}</h3>
        <button className={classes.btn} onClick={props.handleCloseButton}>X</button>  
      </div> 
      <div className={classes.info} ref={textWrapper}>
        <p>{text}</p>
      </div>   
    </div>
  );
}

export default connect(mapStateToProps, null)(TopicInfo);
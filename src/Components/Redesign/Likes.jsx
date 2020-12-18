import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import Paper from '@material-ui/core/Paper';


const Likes = (props) => {
  const [thumbsUpColor, setThumbsUpColor] = useState('black');
  const [thumbsDownColor, setThumbsDownColor] = useState('black');
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        display: 'flex',
        width: 'fit-content',
        height: '30px',
        padding: '0px 5px 0px 5px',
        alignItems: 'center',
        marginLeft: '10px'
      },
      number: {
        fontSize: '1.2rem'
      },
      thumbsUp: {
        height: '20px',
        color: thumbsUpColor,
        cursor: 'pointer'    
      },
      thumbsDown: {
        height: '20px',
        color: thumbsDownColor,
        cursor: 'pointer'    
      }
    }),
  );
  const classes = useStyles();

  const handleThumbsUp = () => {
    if (thumbsUpColor === 'black') {
      setThumbsUpColor('green');
      setThumbsDownColor('black');
    }
    else setThumbsUpColor('black');
  }

  const handleThumbsDown = () => {
    if (thumbsDownColor === 'black') {
      setThumbsUpColor('black');
      setThumbsDownColor('red');
    }
    else setThumbsDownColor('black');
  }

  return (
    <Paper className={classes.root}>
      <p className={classes.number}>0</p>
      <ThumbUpAltIcon className={classes.thumbsUp} onClick={handleThumbsUp}/>
      <ThumbDownAltIcon className={classes.thumbsDown} onClick={handleThumbsDown}/>
    </Paper>
  )
}

export default Likes;

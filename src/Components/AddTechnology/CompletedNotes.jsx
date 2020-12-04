import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    btnWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center' 
    },
    title: {
      margin: '20px 0px 10px 0px',
      padding: '0'
    },
    subtitle: {
      margin: '0px 0px 10px 0px',
      padding: '0'
    },
    btn: {
      margin: '10px'
    }
  }),
);

const CompletedNotes = (props) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <h1 className={classes.title}>Notes added successfully!</h1>
      <h2 className={classes.subtitle}>Would you like to add another note?</h2>
      <div className={classes.btnWrapper}>
        <Button
          className={classes.btn}
          variant="contained"
          size="small"
          color="secondary"
          onClick={()=>history.push('/study')}
        >
          See Notes
        </Button>
        <Button
          className={classes.btn}
          onClick={props.addMoreNotes}
          variant="contained"
          size="small"
          color="secondary"
        >
          Add Note
        </Button>
      </div>
    </div>
  );
}

export default CompletedNotes;
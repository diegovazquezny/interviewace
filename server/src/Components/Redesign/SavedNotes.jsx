import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import * as uiActions from '../../actions/uiActions';
import Paper from '@material-ui/core/Paper';
import Loading from '../Loading';
import APIURL from '../../constants/APIURL';

const mapDispatchToProps = dispatch => ({
  updateUserInfo: (data) => dispatch(actions.updateUserInfo(data)),
  showSavedNotes: (data) => dispatch(uiActions.showSavedNotes(data)),
});

const mapStateToProps = ({
  reducer: { userId, technologies }
}) => ({ userId, technologies });


const useStyles = makeStyles((theme) =>
  createStyles({
    text: {
      width: '100%',
      height: 'fit-content',
      fontSize: '0.95rem',
      margin: '5px 5px 0px 0px',
      padding: '5px',
      backgroundColor: '#f7f7f7',
      transition: 'margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      "&:hover": {
        backgroundColor: "#e5e5e5",
        transition: '250ms',
        cursor: 'pointer'
      },
    },
    root: {
      width: '100%',
      height: '50vh',
      overflowY: 'scroll',
      overflowX: 'hidden'
    }
  }),
);


const SavedNotes = ({ userId, technologies, showSavedNotes, closeSavedPopOver }) => {
  const classes = useStyles();
  const [showNotes, setShowNotes] = useState(false);

  const handleClick = (techName) => (e) =>{
    console.log(techName);
    showSavedNotes(techName);
    if (closeSavedPopOver) closeSavedPopOver();  
  } 
  
  const makeNotes = () => {
    return Object.entries(technologies)
      .map(([tech, data], i) => <Paper className={classes.text} key={`topic${i}`} onClick={handleClick(tech)}>{tech}</Paper>);
  }

  useEffect(()=> {
    if (Object.entries(technologies).length !== 0) setShowNotes(true);
  },[technologies])


  return (
  <div className={classes.root}>
    {showNotes ? makeNotes() : <Loading/>}
  </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedNotes);
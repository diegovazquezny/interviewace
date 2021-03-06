import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SearchForm from './SearchForm';
import NewNoteButton from './NewNoteButton';
import SearchCategories from './SearchCategories';
import TopLevelCategories from './TopLevelCategories';
import * as uiActions from '../../actions/uiActions';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // minWidth: '100px',
      // maxWidth: '360px',
      width: '360px',
      backgroundColor: 'rgb(21 21 21)',
      height: 'calc(100vh - 70px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'auto',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
      [theme.breakpoints.down('md')]: {
        // height: 'calc(100vh - 70px - 56px)',
        display: 'none',
      },
      [theme.breakpoints.up('md')]: {
        height: 'calc(100vh - 70px)',
        display: 'flex',
      },
      // [theme.breakpoints.up('lg')]: {
      //   height: 'calc(100vh - 70px)',
      //   display: 'flex',
      // },  
    },
  }),
);

const mapDispatchToProps = dispatch => ({
  changeMain: (data) => dispatch(uiActions.changeMain(data)),
});

const LeftPanel = ({ getTechName, changeMain }) => {
  const classes = useStyles();

  const addTech = (input) => {
    return () => {
      const techName = input.current.children[0].firstChild.defaultValue;
      if (!techName) {
        // TODO: something else beside logging
        //console.log('blank');
      }
      if (techName) {
        changeMain('search');
        //console.log('search clicked', techName);
        getTechName(techName);
      }
    }
  }

  return (
    <div className={classes.root}>
      <NewNoteButton/>
      <SearchForm addTech={addTech}/>
      <TopLevelCategories/>
      {/* <SearchCategories/> */}
    </div>
  );
}

export default connect(null, mapDispatchToProps)(LeftPanel);
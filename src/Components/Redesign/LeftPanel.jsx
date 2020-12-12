import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SearchForm from './SearchForm';
import CreateNote from './CreateNote';
import SearchCategories from './SearchCategories';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      minWidth: '100px',
      maxWidth: '360px',
      width: '360px',
      backgroundColor: 'rgb(21 21 21)',
      height: 'calc(100vh - 70px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      resize: 'horizontal',
      overflow: 'auto'
    },
  }),
);

const LeftPanel = (props) => {
  const classes = useStyles();

  const addTech = (input) => {
    return () => {
      const techName = input.current.children[0].firstChild.defaultValue;
      if (!techName) {
        console.log('blank');
        //setShowError(true);
      }
      if (techName) {
        console.log(techName);
        props.getTechName(techName);
        // setShowEditor(true);
        // setShowError(false);
        // setShowSearch(!showSearch);
      }
      //setCurrentTech(techName);
    }
  }

  return (
    <div className={classes.root}>
      <CreateNote/>
      <SearchForm addTech={addTech}/>
      <SearchCategories/>
    </div>
  );
}

export default LeftPanel;
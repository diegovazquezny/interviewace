import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SearchForm from './SearchForm';
import Categories from './Categories';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      minWidth: '305px',
      maxWidth: '700px',
      width: '325px',
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

const addTech = (input) => {
  return () => {
    const techName = input.current.children[1].firstChild.defaultValue;
    if (!techName) {
      console.log('blank');
      //setShowError(true);
    }
    if (techName) {
      console.log(techName);
      // setShowEditor(true);
      // setShowError(false);
      // setShowSearch(!showSearch);
    }
    //setCurrentTech(techName);
  }
}

const LeftPanel = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SearchForm addTech={addTech}/>
      <Categories/>
    </div>
  );
}

export default LeftPanel;
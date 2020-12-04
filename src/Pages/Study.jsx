import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TopicsContainer from '../Components/Study/TopicsContainer';
import Header from '../Components/Header/Header';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
    },
  }),
);

const MainContainer = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Header/>
      <TopicsContainer/>    
    </div>
  );
}

export default MainContainer;
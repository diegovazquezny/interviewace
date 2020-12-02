import React, {useContext} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Header from '../Header/Header';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
    },
  }),
);

const LandingPage = (props) => {
  const classes = useStyles();
  return (
    <>
      <Header/>
      <h1>Welcome, please login in first</h1>
    </>
  );
}

export default LandingPage;
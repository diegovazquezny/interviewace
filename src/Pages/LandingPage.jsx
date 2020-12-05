import React, {useContext} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useAuth0 } from "@auth0/auth0-react";
import Header from '../Components/Header/Header';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
    },
  }),
);

const LandingPage = (props) => {
  const { user, isAuthenticated } = useAuth0();
  const classes = useStyles();
  console.log(isAuthenticated);
  return (
    <>
      <Header/>
        { isAuthenticated 
          ? <h1>Welcome to Interview Ace!</h1>
          : <h1>Please login first</h1>
        }
      
    </>
  );
}

export default LandingPage;
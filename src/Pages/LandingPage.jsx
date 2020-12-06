import React, {useContext} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Header from '../Components/Header/Header';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
    },
  }),
);

const mapStateToProps = ({
  reducer: { authenticated, picture, email }
}) => ({ authenticated, picture, email });

const LandingPage = (props) => {
  const isAuthenticated = props.authenticated;
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

export default connect(mapStateToProps, null)(LandingPage);

import React, {useContext} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Header from '../Components/Header/Header';
import { connect } from 'react-redux';
import laptop from '../assets/laptop.svg';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center'
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'blue',
      width: '65%',
      justifyContent: 'space-between'
    },
    image: {
      margin: '0px',
      padding: '0px',
      width: '35rem',
    }
  }),
);

const mapStateToProps = ({
  reducer: { authenticated, picture, email }
}) => ({ authenticated, picture, email });

const LandingPage = (props) => {
  const isAuthenticated = props.authenticated;
  const classes = useStyles();
  console.log(classes.root)
  return (
    <>
      <Header/>
        <div className={classes.root}>
          <div className={classes.container}>
            <div className={classes.title}>
              { isAuthenticated 
                ? <h1>Welcome to Interview Ace!</h1>
                : <h1>Please login first</h1>
              }
            </div>
            <img src={laptop} className={classes.image}></img>
          </div>

        </div>
    </>
  );
}

export default connect(mapStateToProps, null)(LandingPage);

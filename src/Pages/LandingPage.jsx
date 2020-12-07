import React, {useContext} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Header from '../Components/Header/Header';
import { connect } from 'react-redux';
import laptop from '../assets/laptop.svg';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LoginButton from '../Components/Header/LoginButton';

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
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        width: '100vw',
        flexDirection: 'column',
        alignItems: 'center'
      },
      [theme.breakpoints.up('md')]: {
        width: '100vw',
        margin: '0px 20px 0px 20px',
        fontSize: '1.3rem'
      },
      [theme.breakpoints.up('lg')]: {
        width: '65%',
      },
    },
    image: {
      margin: '20px 0px 0px 0px',
      padding: '0px',
      [theme.breakpoints.down('sm')]: {
        width: '100vw',
      },
      [theme.breakpoints.up('md')]: {
        width: '35%'
      },
      [theme.breakpoints.up('lg')]: {
        width: '35%',
      },
    },
    title: {
      display: 'flex',
      flexDirection: 'column',
      width: '50%',
      color: '#333',
      [theme.breakpoints.down('sm')]: {
        width: '97vw',
        fontSize: '0.75rem'
      },
    },
    btn: {
      margin: '0px 10px 0px 10px'  
    },
    btnWrapper: {
      display: 'flex',
      justifyContent: 'center'
    }
  }),
);

const mapStateToProps = ({
  reducer: { authenticated, picture, email }
}) => ({ authenticated, picture, email });

const LandingPage = (props) => {
  const isAuthenticated = props.authenticated;
  const history = useHistory();
  const classes = useStyles();
  return (
    <>
      <Header/>
        <div className={classes.root}>
          <div className={classes.container}>
            <div className={classes.title}>
              { isAuthenticated 
                ? <>
                    <h1 className={classes.bannerText}>Time to ace that next interview. Let's get started right now!</h1>
                    <div className={classes.btnWrapper}>
                      <Button
                        className={classes.btn}
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={()=>history.push('/study')}
                      >
                        Study
                      </Button>
                      <Button
                        className={classes.btn}
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={()=>history.push('/add-tech')}
                      >
                        Add notes
                      </Button>
                    </div>  
                  </>
                : <>
                    <h1 className={classes.bannerText}>Ace your next interview with Interview Ace. Join today!</h1>
                    <div className={classes.btnWrapper}>
                      <LoginButton/> 
                    </div>
                  </>
              }
            </div>
            <img src={laptop} className={classes.image}></img>
          </div>

        </div>
    </>
  );
}

export default connect(mapStateToProps, null)(LandingPage);

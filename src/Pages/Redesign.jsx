import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import LeftPanel from '../Components/Redesign/LeftPanel';
import MainPanel from '../Components/Redesign/MainPanel';
import Header from '../Components/Header/Header';
import Loading from '../Components/Loading';
import RightPanel from '../Components/Redesign/RightPanel';
import BottomNav from '../Components/Redesign/BottomNav';
import * as actions from '../actions/actions'; 
import APIURL from '../constants/APIURL';
import { connect } from 'react-redux';
import getJWT from '../helperFunctions/getJWT';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
      },
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
      [theme.breakpoints.up('lg')]: {
        // display: 'none',
      },
    },
    container: {
      display: 'flex',
    },
    body: {
      [theme.breakpoints.down('sm')]: {
        height: 'calc(100vh - 56px)',
        // height: '100vh',
        overflow: 'scroll'
      },
      [theme.breakpoints.down('md')]: {
        height: 'calc(100vh - 56px)',
        overflow: 'scroll'
      },
      [theme.breakpoints.up('lg')]: {
        overflow: 'visible'
      },
    }
  }),
);

const mapDispatchToProps = dispatch => ({
  allCategories: (data) => dispatch(actions.allCategories(data)),
});

const Redesign = (props) => {
  const classes = useStyles();
  const [didFetch, setDidFetch] = useState(false);
  const [categoryArray, setCategoryArray] = useState([]);
  const [currentTech, setCurrentTech] = useState('');
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const getTechName = (techName) => {
    //setCurrentTech(techName);
    setTimeout(setCurrentTech(techName), 0);
  } 

  //const JWT = ;
  console.log(getJWT);
  if (!didFetch) {
    fetch(APIURL + '/technology/all-categories' , {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept" : "application/json",
        "Access-Control-Allow-Origin" : "*",
        "Authorization" : 'Bearer ' + getJWT
      },
      mode: "cors"
    })
    .then(res => res.json())
    .then(categories => {
      props.allCategories(categories);
    })
    .then(data => setDidFetch(true))
    .catch(err => console.log(err));
  }
  
  return (
    <div className={classes.body}>
      { didFetch 
        ? <div>
            <Header/>
            <div className={classes.container}>
              <LeftPanel getTechName={getTechName}/>
              <MainPanel currentTech={currentTech}/>
              <RightPanel/>     
            </div>
          </div>
        : <Loading/>
      }
      <>
        <BottomNav getTechName={getTechName}/>
      </>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(Redesign);
import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import LeftPanel from '../Components/Redesign/LeftPanel';
import MainPanel from '../Components/Redesign/MainPanel';
import Header from '../Components/Header/Header';
import Loading from '../Components/Loading';
import Categories from '../Components/Redesign/Categories';
import { connect } from 'react-redux';
import * as actions from '../actions/actions'; 

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
    },
  }),
);

const mapDispatchToProps = dispatch => ({
  allCategories: (data) => dispatch(actions.allCategories(data)),
});

const Redesign = (props) => {
  const classes = useStyles();
  const [didFetch, setDidFetch] = useState(false);
  const [categoryArray, setCategoryArray] = useState([]);
  const api_uri = process.env.NODE_ENV !== 'development' 
  ? 'https://interview-ace.herokuapp.com'
  : '';
  
  const token = 'hello';
  if (!didFetch) {
    fetch(api_uri + '/technology/all-categories' , {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept" : "application/json",
        "Access-Control-Allow-Origin" : "*",
        "Bearer" : token
      },
      mode: "cors"
    })
    .then(res => res.json())
    .then(categories => {
      const categoryArray = categories.success.map(category => category.category_name);
      props.allCategories(categoryArray);
      setCategoryArray(categoryArray);
      console.log(categoryArray); 
    })
    .then(data => setDidFetch(true))
    .catch(err => console.log(err));
  }
  
  return (
    <>
      { didFetch 
        ? <div>
            <Header/>
            <LeftPanel/>
            <MainPanel/>     
          </div>
        : <Loading/>
      }
    </>
  );
}

export default connect(null, mapDispatchToProps)(Redesign);
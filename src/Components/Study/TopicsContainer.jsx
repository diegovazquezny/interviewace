
import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Topic from './Topic';
import TopicInfo from './TopicInfo';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

const mapDispatchToProps = dispatch => ({
  updateTechnologies: (data) => dispatch(actions.updateTechnologies(data))
});

const mapStateToProps = ({
  reducer: { technologies, userId }
}) => ({ technologies, userId });

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    container: {
      [theme.breakpoints.up('lg')]: {
        margin: '0px 10rem 0px 10rem'
      },
    }
  }),
);

/* TODO 
  fetch to get user's tech and bullets
  cache it in redux to prevent unnecessary network requests
  eventually allow user to edit from study guide
*/

const TopicsContainer = (props) => {
  const classes = useStyles();
  const [showInfo, setShowInfo] = useState(false);
  const [currentTopic, setCurrentTopic] = useState('');
  const [topicsFetched, setTopicsFetched] = useState(false);
  const api_uri = process.env.NODE_ENV !== 'development' 
    ? 'https://interview-ace.herokuapp.com'
    : '';  

  if (!topicsFetched) {
    fetch(api_uri + `/technology/notes?id=${props.userId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept" : "application/json",
        "Access-Control-Allow-Origin" : "*"
      },
      mode: "cors"
    })
    .then(res => res.json())
    .then(data => { 
      console.log('into Redux', data.technologies);
      props.updateTechnologies(data.technologies);
      setTopicsFetched(true);
    })
    .catch(err => console.log(err));
  }     
  
  const generateTopics = () => {
    return Object.entries(props.technologies).map(([tech_name, _], i) => {
      return (
        <Topic name={tech_name} handleClick={handleClick} key={`k${i}`}/>
      )
    })
  }
  
  const handleCloseButton = () => {
    setShowInfo(false);
  }

  const handleClick = (topic) => {
    return () => {
      setCurrentTopic(topic);
      setShowInfo(true);
    }
  }
  
  return (
    <div className={classes.container}>
      {
        topicsFetched
          ? showInfo
            ? <TopicInfo currentTopic={currentTopic} handleCloseButton={handleCloseButton}/>
            : <div className={classes.root}>
                {generateTopics()}  
              </div>
          : <h1>Loading topics</h1>
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicsContainer);
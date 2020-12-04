
import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Topic from './Topic';
import TopicInfo from './TopicInfo';
import { connect } from 'react-redux';
import * as actions from '../../Actions/Actions';

const topics = [
  'React',
  'Redux',
  'NodeJS',
  'Event Loop',
  'React Smart vs Presentational'
];

const mapDispatchToProps = dispatch => ({
  updateTechnologies: (data) => dispatch(actions.updateTechnologies(data))
});

const mapStateToProps = ({
  reducer: { technologies }
}) => ({ technologies });

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',

    },
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

  if (!topicsFetched) {
    fetch(`/technology/notes?id=${5}`, {
      method: 'GET',
      headers: {
        "Content-Type": "Application/JSON",
      },
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
    <>
      {
        topicsFetched
          ? showInfo
            ? <TopicInfo currentTopic={currentTopic} handleCloseButton={handleCloseButton}/>
            : <div className={classes.root}>
                {generateTopics()}  
              </div>
          : <h1>Loading topics</h1>
      }
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicsContainer);
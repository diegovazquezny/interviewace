
import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Topic from './Topic';
import TopicInfo from './TopicInfo';

const topics = [
  'React',
  'Redux',
  'NodeJS',
  'Event Loop',
  'React Smart vs Presentational'
];

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',

    },
  }),
);

const TopicsContainer = (props
  ) => {
  const classes = useStyles();
  const [showInfo, setShowInfo] = useState(false);
  const [currentTopic, setCurrentTopic] = useState('');
  
  const generateTopics = () => {
    return topics.map((topic, i) => {
      return (
        <Topic name={topic} handleClick={handleClick} key={`k${i}`}/>
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
      { showInfo 
        ? <TopicInfo currentTopic={currentTopic} handleCloseButton={handleCloseButton}/>  
        : <div className={classes.root}>
            {generateTopics()}  
          </div>
      }   
    </>
  );
}

export default TopicsContainer;
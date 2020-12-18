import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import APIURL from '../../constants/APIURL';
import SearchCategories from './SearchCategories';
import * as actions from '../../actions/actions';
import Loading from '../Loading';
import SavedNotes from './SavedNotes';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import PageviewIcon from '@material-ui/icons/Pageview';

const mapStateToProps = ({
  reducer: { categories, email, technologies, userId  }
}) => ({ categories, email, technologies, userId });

const mapDispatchToProps = dispatch => ({
  updateTechnologies: (data) => dispatch(actions.updateTechnologies(data))
});

function SavedNotesMobile(props) {

  const [expanded, setExpanded] = useState(false);
  const [topicsFetched, setTopicsFetched] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  if (!props.userId) return <p>Log in to see saved notes</p>

  const getNotes = () => {
    if (!topicsFetched) {
      fetch(APIURL + `/technology/notes?id=${props.userId}`, {
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
        props.updateTechnologies(data.technologies);
        setTopicsFetched(true);
      })
      .catch(err => console.log(err));
    }
  }

  getNotes();

  return (
    <div 
      style={{
        display: 'flex', 
        flexDirection:'column', 
        alignItems: 'center', 
        justifyContent:'center', 
        width: '250px',
      }}>
        {setTopicsFetched ? <SavedNotes closeSavedPopOver={props.closeSavedPopOver}/> : <Loading/>}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedNotesMobile);
import React, { useState } from 'react';
import { connect } from 'react-redux';
import APIURL from '../../constants/APIURL';
import * as actions from '../../actions/actions';
import Loading from '../Loading';
import SavedNotes from './SavedNotes';

const mapStateToProps = ({
  reducer: { categories, email, technologies, userId  }
}) => ({ categories, email, technologies, userId });

const mapDispatchToProps = dispatch => ({
  updateTechnologies: (data) => dispatch(actions.updateTechnologies(data))
});

function SavedNotesMobile(props) {

  const [expanded, setExpanded] = useState(false);
  const [topicsFetched, setTopicsFetched] = useState(false);
  const [noNotes, setNoNotes] = useState(false);

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
        if (Object.entries(data.technologies).length === 0) setNoNotes(true);
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
        height: '60vh'
      }}>
        {noNotes && <p>You have no saved notes</p>}
        {!topicsFetched && <Loading/>}
        {(topicsFetched && !noNotes) && <SavedNotes closeSavedPopOver={props.closeSavedPopOver}/>}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedNotesMobile);
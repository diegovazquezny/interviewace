import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormatListNumbered } from '@material-ui/icons';
import { connect } from 'react-redux';
import APIURL from '../../constants/APIURL';
import CategoriesList from './CategoriesList';
import SearchCategories from './SearchCategories';
import * as actions from '../../actions/actions';
import Loading from '../Loading';
import SavedNotes from '../Redesign/SavedNotes';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import PageviewIcon from '@material-ui/icons/Pageview';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      // margin: 'auto',
    },
    width: '95%',
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    // width: '250px',
    '&$expanded': {
      minHeight: 56,
    },
  },
  // width: '250px',
  content: {
    '&$expanded': {
      margin: '12px 0',
      fontSize: '10px'
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    // padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const topAccordionStyle = {
  width: '250px', 
  borderRadius: '4px 4px 0px 0px', 
  backgroundColor: '#ececec'
}

const bottomAccordionStyle = {
  width: '250px', 
  borderRadius: '0px 0px 4px 4px', 
  backgroundColor: '#ececec'
}

const mapStateToProps = ({
  reducer: { categories, email, technologies, userId  }
}) => ({ categories, email, technologies, userId });

const mapDispatchToProps = dispatch => ({
  updateTechnologies: (data) => dispatch(actions.updateTechnologies(data))
});

function Categories(props) {

  const [expanded, setExpanded] = useState(false);
  const [topicsFetched, setTopicsFetched] = useState(false);
  //const [fetchedNotes, setFetchedNotes] = useState(false);

  //console.log(topicsFetched);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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
        // if (!Object.entries(data.technologies).length) {
        //   setFetchedNotes(true);
        // } else setFetchedNotes(false);
        props.updateTechnologies(data.technologies);
        setTopicsFetched(true);
      })
      .catch(err => console.log(err));
    }
    //console.log(props.technologies);
    //console.log('fetched notes', topicsFetched);
  }

  return (
    <div 
      style={{
        display: 'flex', 
        flexDirection:'column', 
        alignItems: 'center', 
        justifyContent:'center', 
        width: '250px',
      }}>
      <div>
      <Accordion style={topAccordionStyle} square expanded={expanded === `panel1`} onChange={handleChange(`panel1`)}>
          <AccordionSummary 
            aria-controls="panel1d-content" 
            id={`panel1d-header`} 
            onClick={getNotes}
          >
            <div style={{display:'flex', justifyContent:'space-between', width:'75%'}}>
              <FolderOpenIcon/>
              <Typography>{'View saved notes'}</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {setTopicsFetched ? <SavedNotes/> : <Loading/>}
          </AccordionDetails>
        </Accordion>
        </div>
        <div>
        <Accordion style={bottomAccordionStyle} square expanded={expanded === `panel2`} onChange={handleChange(`panel2`)}>
          <AccordionSummary 
            aria-controls="panel2d-content" 
            id={`panel2d-header`}
          >
             <div>
              <PageviewIcon style={{marginRight:'5px'}}/>
              <Typography>{'Browse all notes'}</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <SearchCategories/>
          </AccordionDetails>
        </Accordion>
        </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
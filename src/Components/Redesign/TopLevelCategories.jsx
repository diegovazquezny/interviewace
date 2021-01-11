import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import APIURL from '../../constants/APIURL';
import * as actions from '../../actions/actions';
import Loading from '../Loading';
import SavedNotes from '../Redesign/SavedNotes';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

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
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
      fontSize: '10px',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    height: 'auto'
  },
}))(MuiAccordionDetails);

const topAccordionStyle = {
  width: '250px', 
  borderRadius: '4px 4px 0px 0px', 
  backgroundColor: '#ececec'
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex', 
      flexDirection:'column', 
      alignItems: 'center', 
      justifyContent:'center', 
      width: '250px',
    },
    menuTitles: {
      fontSize: '0.75rem'
    }
  }),
);

const mapStateToProps = ({
  reducer: { categories, email, technologies, userId  }
}) => ({ categories, email, technologies, userId });

const mapDispatchToProps = dispatch => ({
  updateTechnologies: (data) => dispatch(actions.updateTechnologies(data))
});

function Categories({userId, technologies, updateTechnologies}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [topicsFetched, setTopicsFetched] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const getNotes = () => {
    if (!topicsFetched) {
      fetch(APIURL + `/technology/notes?id=${userId}`, {
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
        updateTechnologies(data.technologies);
        setTopicsFetched(true);
      })
      .catch(err => console.log(err));
    }
  }

  useEffect(() => {
    updateTechnologies(technologies);
    setRefresh(state => !state);
  },[JSON.stringify(technologies)]);

  return (
    <div className={classes.root}>
      <div>
        <Accordion style={topAccordionStyle} square expanded={expanded === `panel1`} onChange={handleChange(`panel1`)}>
          <AccordionSummary 
            aria-controls="panel1d-content" 
            id={`panel1d-header`} 
            onClick={getNotes}
          >
            <div style={{display:'flex', width:'75%'}}>
              <FolderOpenIcon style={{marginRight: '5px'}}/>
              <Typography>{'View saved notes'}</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {setTopicsFetched ? <SavedNotes/> : <Loading/>}
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
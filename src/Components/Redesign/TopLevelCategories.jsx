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
    '&$expanded': {
      minHeight: 56,
    },
  },
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
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const mapStateToProps = ({
  reducer: { categories, email  }
}) => ({ categories, email });

function Categories(props) {

  const [expanded, setExpanded] = useState(false);
  const topLevel = ['View saved notes', 'Browse all notes']
  const handleChange = (panel) => (event, newExpanded) => {
    console.log('change', panel, newExpanded);
    setExpanded(newExpanded ? panel : false);
  };

  const accordions = topLevel.map((category, i) => {
    return (
      <div key={`k${i}`}>
        <Accordion square expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
          <AccordionSummary aria-controls="panel1d-content" id={`panel${i}d-header`}>
            <Typography variant={'body2'}>{category}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SearchCategories/>
          </AccordionDetails>
        </Accordion>
      </div>  
    );
  });
  
  return (
    <div style={{display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent:'center', paddingLeft: '10px'}}>
      <div>
        {accordions}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, null)(Categories);
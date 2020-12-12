import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormatListNumbered } from '@material-ui/icons';
import { connect } from 'react-redux';
import APIURL from '../../constants/APIURL';
import CategoriesList from './CategoriesList';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '95%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    accordion: {
      backgroundColor: 'gray',
      width: 'inherit'
    }
  }),
);

const mapStateToProps = ({
  reducer: { categories, email  }
}) => ({ categories, email });

function Categories(props) {
  const classes = useStyles();
  const [accordions, setAccordions] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const handleAccordionClick = (id) => {
    return (e) => {
      console.log('click', id);
      // fetch(APIURL + '/technology/technology-from-category?id=' + id)
      //   .then(res => res.json())
      //   .then(data => console.log(data))
      //   .catch(err => console.log(err))

    }
  }
  
  const makeAccordions = () => {
    console.log('from reducer', props);
    return Object.keys(props.categories).map((category, i) => {
      return (
        <div key={`k${i}`}>
          <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              onClick={handleAccordionClick(i)}
            >
          <Typography className={classes.heading}>{category}</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordion}>
          <CategoriesList categoryID={i}/>
        </AccordionDetails>
      </Accordion>
      </div>  
      );
    });
  }
  if (accordions.length === 0) {
    console.log('setting accordions');
    setAccordions(makeAccordions());
    setShowCategories(true);
  }
  
  return (
    <>
     {
       showCategories
        ? <div className={classes.root}>
            {accordions}
          </div>
        : ''
     } 
    </>
  );
}

export default connect(mapStateToProps, null)(Categories);
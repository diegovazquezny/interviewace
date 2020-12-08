import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Header from '../Components/Header/Header';
import SearchForm from '../Components/AddTechnology/SearchForm';
import CompletedNotes from '../Components/AddTechnology/CompletedNotes';
import SearchFieldError from '../Components/AddTechnology/SearchFieldError';
import Quill from '../Components/AddTechnology/Quill';
import Browse from '../Components/AddTechnology/Browse';

const mapStateToProps = ({
  reducer: { userId }
}) => ({ userId });

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    tabs: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    container: {
      boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)'
    },
    tabPanel: {
      textAlign: 'center'
    }
  }),
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AddTechnology = (props) => {
  const classes = useStyles();
  const [showEditor, setShowEditor] = useState(false);
  const [editorError, setEditorError] = useState(false);
  const [currentTech, setCurrentTech] = useState('');
  const [notesCompleted, setNotesCompleted] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addTech = (input) => {
    return () => {
      const techName = input.current.children[1].firstChild.defaultValue;
      if (!techName) setShowError(true);
      if (techName) {
        setShowEditor(true);
        setShowError(false);
        setShowSearch(!showSearch);
      }
      setCurrentTech(techName);
    }
  }

  const completedNotes = () => {
    setShowEditor(false);
    setNotesCompleted(true);
  }

  const addMoreNotes = () => {
    setNotesCompleted(false);
    setShowEditor(false);
    setShowSearch(true);
    // TODO: clear the technology in search
  }

  const showEditorError = () => {
    setEditorError(true);
  }

  const backToSearch = () => {
    setShowSearch(true);
    setShowEditor(false);
  }

  return (
    <>
      <Header />
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.tabs}>
            <AppBar position="static">
              <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Create New Note" {...a11yProps(0)} />
                <Tab label="Browse Notes" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel className={classes.tabPanel} value={value} index={0}>
              {showSearch && <SearchForm addTech={addTech}/>}
              {showError && <SearchFieldError/>}
              {editorError && <h1>Error</h1>}
              {showEditor && 
                <Quill
                  backToSearch={backToSearch}
                  showEditorError={showEditorError} 
                  currentTech={currentTech}
                  completedNotes={completedNotes}
                  userId={props.userId}
                />}
              {notesCompleted && 
                <CompletedNotes addMoreNotes={addMoreNotes}/>}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Browse/>
            </TabPanel>
          </div>
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps, null)(AddTechnology);
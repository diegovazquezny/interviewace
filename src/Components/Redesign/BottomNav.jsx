import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import Popover from '@material-ui/core/Popover';
import SearchFormMobile from './SearchFormMobile';
import SavedNotesMobile from '../Redesign/SavedNotesMobile';
import * as uiActions from '../../actions/uiActions';
import * as actions from '../../actions/actions';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      position: 'fixed',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        bottom: '0'
      },
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
      [theme.breakpoints.up('lg')]: {
        display: 'none',
      },
    },
    container: {
      display: 'flex'
    }
  }),
);

const mapDispatchToProps = dispatch => ({
  allCategories: (data) => dispatch(actions.allCategories(data)),
  changeMain: (data) => dispatch(uiActions.changeMain(data)),
});

const mapStateToProps = ({
  reducer: { userName, picture, authenticated, userId }
}) => ({ userName, picture, authenticated, userId });

const BottomNav = ({ getTechName, changeMain, userName }) => {
  const classes = useStyles();
  const [value, setValue] = useState('recents');
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuItem, setMenuItem] = useState('');
  const open = Boolean(anchorEl);

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const handleAddNoteClick = (e) => {
    if (!userName) {
      handlePopOverOpen(e);
      return;
    }
    const menuItem = e.currentTarget.children[0].children[1].textContent;
    console.log('userName', userName);
    setMenuItem(menuItem);
    changeMain(menuItem);
  }

  const handlePopOverOpen = (e) => {
    //console.log('click =>', e.currentTarget.children[0].children[1].textContent);
    const menuItem = e.currentTarget.children[0].children[1].textContent;
    //if (!userName && menuItem === 'Saved') return;
    console.log(menuItem, 'was clicked');
    setMenuItem(menuItem);
    setAnchorEl(e.currentTarget);
    if (!userName) {
      return;
    }
    changeMain(menuItem);
  }

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleSearchClick = (textRef, value) => (e) => {
    //console.log('search option clicked')
    const techName = value ? value : textRef.current.children[0].firstChild.value;
    setTimeout(setAnchorEl(null), 0);
    if (techName) {
      changeMain('search');
      getTechName(techName);
    }
  }

  const closeSavedPopOver = () => setAnchorEl(null); 

  return (
    <>
      <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
        <BottomNavigationAction 
          label="Add" 
          value="add" 
          icon={<AddBoxIcon />}
          onClick={handleAddNoteClick} 
        />
        <BottomNavigationAction 
          label="Search" 
          value="search" 
          icon={<SearchIcon />}
          onClick={handlePopOverOpen} 
        />
        <BottomNavigationAction 
          label="Saved" 
          value="saved" 
          icon={<FolderIcon />}
          onClick={handlePopOverOpen}  
        />
        <BottomNavigationAction 
          label="Browse" 
          value="browse" 
          icon={<VisibilityOutlinedIcon />}
          onClick={handlePopOverOpen}   
        />
      </BottomNavigation>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {menuItem === 'Add' && <p>Log in to create a note</p>}
        {menuItem === 'Search' && <SearchFormMobile handleSearchClick={handleSearchClick}/>}
        {menuItem === 'Saved' && <SavedNotesMobile closeSavedPopOver={closeSavedPopOver}/>}
        {menuItem === 'Browse' && <p>Coming soon!</p>}
      </Popover>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav);
import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import APIURL from '../../constants/APIURL';
import getJWT from '../../helperFunctions/getJWT';

const BootstrapInput = withStyles((theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

const useStyles = makeStyles((theme) =>
  createStyles({
    margin: {
      // margin: theme.spacing(1),
      flex: '1'
    },
    categoryForm: {
      // width: '25px'
    },
    option: {
      width: '85%',
      overflowX: 'scroll',
      fontSize: '0.75rem'
    },
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      margin: '2px 0px 10px 0px'
    }
  }),
);

/*
  TODO
    create reducer to store new note info (name & category)
    that will be sent to BE in Quill.jsx (handleClick) in the body of the req
*/

export default function NewNoteInfoForm({ getInfo }) {
  const classes = useStyles();
  const [techCategory, setTechCategory] = useState('');
  const [techName, setTechName] = useState('');
  const [categories, setCategories] = useState([]);
  const [noteInfo, setNoteInfo] = useState({});

  const handleCategoryChange = (event) => {
    setTechCategory(event.target.value);
    setNoteInfo({
      techName: techName,
      techCategory: event.target.value  
    });
  };

  const handleNameInput = (event) => {
    setTechName(event.target.value);
    setNoteInfo({
      techName: event.target.value,
      techCategory: techCategory  
    });
  }

  useEffect(()=>{
    setNoteInfo({
      techName: techName,
      techCategory: techCategory  
    });
    getInfo(noteInfo);
  },[techCategory, techName]);

  if (categories.length === 0) {
    fetch(APIURL + '/technology/all-categories', {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': 'Bearer ' + getJWT,
      }
    })
      .then(res => res.json())
      .then(data => {
        const options = [];
        data.categories.forEach((category, i) => {
          options.push(<option
              className={classes.option} 
              value={category.category_name}
              key={`o${i}`}
            >
              {category.category_name}
            </option>
          );
        });
        setCategories(options);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className={classes.container}>
      {/* Tech Name Form */}
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="new-note-textbox">Topic Name</InputLabel>
        <BootstrapInput
        value={techName}
        onChange={handleNameInput}
        id="new-note-textbox" />
      </FormControl>
      {/* Tech Category Form */}
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="new-note-select-native">Category</InputLabel>
        <NativeSelect
          className={classes.categoryForm}
          id="new-note-select-native"
          value={techCategory}
          onChange={handleCategoryChange}
          input={<BootstrapInput />
          }
        >
          <option aria-label="None" value="" className={classes.option} />
          {categories}
        </NativeSelect>
      </FormControl>
    </div>
  );
}

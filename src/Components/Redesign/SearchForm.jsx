import React, { useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '300px',
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        width: '95vw'
      },
      height: 'max-content',
      alignItems: 'center',
    },
    inputRoot: {
      //color: "purple",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "red"
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "red"
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "purple"
      },
      "& .MuiAutocomplete-input" : {
        //color: 'red'
      }
    },	
  })
);

const useSearchStyles = makeStyles({
  btn: {
    height: '45px',
    marginLeft: '5px',
    // alignSelf: 'baseline'
  },
  textField: {
    backgroundColor: 'gray',
    borderRadius: '4px',
    height: 'max-content'
  },
});

const SearchForm = (props) => {
  const [techList, setTechList] = useState([]);
  const [didFetch, setDidFetch] = useState(false);
  const [input, setInput] = useState('');
  const textFieldRef = useRef();
  const classes = useStyles();
  const searchClasses = useSearchStyles();
  //const labelClasses = useLabelStyles();

  const api_uri = process.env.NODE_ENV !== 'development' 
    ? 'https://interview-ace.herokuapp.com'
    : '';

  function fetchTech () {
    fetch(api_uri + '/technology/all-tech')
      .then(res => res.json())
      .then(data => {
        const { technologies } = data;
        setTechList(technologies)
      })
      .catch(err => console.log(err));
  }
   
  useEffect(() => {
    if (!didFetch) {
      fetchTech();
    }
  });

  useEffect(() => {
    setDidFetch(true);
  },[JSON.stringify(techList)]);
  return (
    <>
      <div className={classes.root}>
        {
          didFetch 
          ? <Autocomplete
              classes={classes}
              id="search"
              freeSolo
              options={techList.map((option) => option.tech_name)}
              renderInput={(params) => (
                <TextField
                  className={searchClasses.textField} 
                  {...params} 
                  label="Search for a technology" 
                  margin="normal" 
                  variant="outlined"
                  ref={textFieldRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
              )}
            />
          : <h1>Fetching Data</h1> 
        }
      <Button
        variant="contained"
        size="small"
        color="secondary"
        className={searchClasses.btn}
        onClick={props.addTech(textFieldRef)}
        ><SearchIcon/></Button>    
      </div>
    </>
  ); 
}

export default SearchForm;
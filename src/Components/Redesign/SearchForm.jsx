import React, { useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      // backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'flex-end',
      padding: '5px',
      [theme.breakpoints.down('sm')]: {
        width: '300px',
      },
      height: 'max-content',
      alignItems: 'center',
    },
    inputRoot: {
      //color: "purple",
      "& .MuiOutlinedInput-notchedOutline": {
        display: 'none',
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
    height: '40px',
    marginLeft: '5px',
    marginRight: '5px',
    width: '50px',
    minWidth: '50px'
  },
  textField: {
    backgroundColor: 'white',
    borderRadius: '4px',
    height: 'max-content',
    margin: '0px',
  },
  inputLabel: {
    color: 'red'
  }
});

const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    color: 'white',
    height: 20,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    width: 20
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);


const SearchForm = (props) => {
  const [techList, setTechList] = useState([]);
  const [didFetch, setDidFetch] = useState(false);
  const [input, setInput] = useState('');
  const textFieldRef = useRef();
  const classes = useStyles();
  const searchClasses = useSearchStyles();

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
              size="small"
              freeSolo
              options={techList.map((option) => option.tech_name)}
              renderInput={(params) => (
                <TextField
                  className={searchClasses.textField} 
                  {...params} 
                  margin="normal" 
                  variant="outlined"
                  ref={textFieldRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={'Search for a technology'}
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
        ><SearchIcon/>
      </Button>    
      {/* <StyledButton/> */}
      </div>
    </>
  ); 
}

export default SearchForm;
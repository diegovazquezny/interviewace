import React, { useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const SearchForm = (props) => {
  const [techList, setTechList] = useState([]);
  const [didFetch, setDidFetch] = useState(false);
  const [input, setInput] = useState('');
  const textFieldRef = useRef();

  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        display: 'flex',
        width: '500px',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
          width: '95vw'
        },
      },
      btn: {
        height: '45px',
        marginLeft: '10px'
      }
    })
  );

  const classes = useStyles();

  function fetchTech () {
    fetch('/technology/all-tech')
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
    <div className={classes.root}>
      <div style={{ width: 300 }}>
        {
          didFetch 
          ? <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={techList.map((option) => option.tech_name)}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Choose a technology" 
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
      </div>
      <Button
        variant="contained"
        size="small"
        color="secondary"
        className={classes.btn}
        onClick={props.addTech(textFieldRef)}
      >Add</Button>    
    </div>
  ); 
}

export default SearchForm;
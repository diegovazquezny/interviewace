import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import APIURL from '../../constants/APIURL';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
    },
  }),
);

const CategoriesList = (props) => {
  const classes = useStyles();
  const [showList, setShowList] = useState(false);
  if (props.id) {
    fetch(APIURL + '/technology/technology-from-category?id=' + props.id)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }
  console.log('show list');
  return (
    <>
      <h2>Technology</h2>
    </>
  );
}

export default CategoriesList;
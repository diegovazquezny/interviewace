import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

const mapDispatchToProps = dispatch => ({
  updateUserInfo: (data) => dispatch(actions.updateUserInfo(data)),
});

const mapStateToProps = ({
  reducer: { userName, picture, authenticated }
}) => ({ userName, picture, authenticated });


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '260px',
      height: 'calc(100vh - 70px)',
      backgroundColor: 'rgb(21 21 21)'    
    },
  }),
);

const RightPanel = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);
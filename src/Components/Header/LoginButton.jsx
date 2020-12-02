import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    btn: {
      marginRight: '40px'
    },
  }),
);

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const classes = useStyles();

  return (
    <Button 
      onClick={() => loginWithRedirect()}
      variant="contained"
      size="large"
      color="secondary"
      className={classes.btn}
    >
      Log In
    </Button>
  );
};

export default LoginButton;

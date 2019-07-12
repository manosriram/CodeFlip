import React from "react";
import { Container, Typography, makeStyles, Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { StyledInput } from "../Styles/StyledComp";
import "../Styles/App.css";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    background: "white",
    color: "whitesmoke",
    width: "60vw",
    margin: "auto",
    "border-radius": "5px"
  },
  cont: {
    margin: "auto",
    "text-align": "center"
  },
  button: {
    background: "#fdcb6e"
  }
}));

const Register = () => {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.cont}>
        <Container className={classes.cont}>
          <Paper className={classes.root} id="paper">
            <form>
              <StyledInput type="text" placeholder="User Name" />
              <br />
              <br />
              <StyledInput type="text" placeholder="Email Address." />
              <br />
              <br />
              <StyledInput type="password" placeholder="Password" />
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Register
              </Button>
            </form>
          </Paper>
        </Container>
      </Container>
    </>
  );
};

export default Register;

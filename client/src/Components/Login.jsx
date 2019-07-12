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
    width: "50vw",
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

const Login = () => {
  const classes = useStyles();
  const [userData, setUserData] = React.useState({});

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Container className={classes.cont}>
        <Container className={classes.cont}>
          <Paper className={classes.root} id="paper">
            <form onChange={handleChange}>
              <StyledInput
                type="text"
                placeholder="Email Address."
                name="email"
              />
              <br />
              <br />
              <StyledInput
                type="password"
                placeholder="Password"
                name="password"
              />
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Login
              </Button>
            </form>
          </Paper>
        </Container>
      </Container>
    </>
  );
};

export default Login;

import React, { useEffect } from "react";
import { Container, Typography, makeStyles, Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { StyledInput } from "../Styles/StyledComp";
import "../Styles/App.css";
import Headers from "../Header";

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
  const [userData, setUserData] = React.useState({});
  const [message, setMessage] = React.useState("");
  const [isSpinning, setSpinner] = React.useState(true);

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setSpinner(false);
  });

  const handleSubmit = async e => {
    e.preventDefault();
    setSpinner(true);
    const resp = await fetch("/auth/register", {
      method: "POST",
      headers: Headers.headers,
      body: JSON.stringify({ userData })
    });
    const data = await resp.json();
    setMessage(data.message);
    setSpinner(false);
  };

  if (isSpinning) {
    return (
      <div className="spinner-border" role="status" id="spinner">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <Container className={classes.cont}>
        <Container className={classes.cont}>
          <h4>{message}</h4>
          <Paper className={classes.root} id="paper">
            <form onChange={handleChange}>
              <StyledInput
                type="text"
                placeholder="User Name"
                name="username"
              />
              <br />
              <br />
              <StyledInput
                type="email"
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
                id="btn"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleSubmit}
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

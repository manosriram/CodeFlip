import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import "../Styles/App.css";

const Index = () => {
  const [loginStat, setLoginStat] = React.useState(false);
  const [isSpinning, setSpinner] = React.useState(true);

  useEffect(() => {
    const getLoginStat = async () => {
      const resp = await fetch("/auth/isLoggedIn");
      const res = await resp.json();
      setLoginStat(res.success);
    };

    getLoginStat();
    setSpinner(false);
  }, []);

  if (isSpinning) {
    return (
      <div className="spinner-border" role="status" id="spinner">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (!loginStat) {
    return (
      <>
        <Container>
          <h3>
            Welcome to Flip-Code.{" "}
            <Link to="/login" id="lnk">
              Login
            </Link>{" "}
            or{" "}
            <Link id="lnk" to="/register">
              Register
            </Link>{" "}
            to Get Started.
          </h3>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container>
          <h3>Welcome to Code Flip !</h3>
          <br />
          <h4>
            <Link to="/addCard" id="lnk">
              Add
            </Link>{" "}
            a Card or View Look up your cards{" "}
            <Link to="/showCards" id="lnk">
              here
            </Link>{" "}
            !
          </h4>
        </Container>
      </>
    );
  }
};

export default Index;

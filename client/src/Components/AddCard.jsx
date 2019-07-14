import React, { useEffect } from "react";
import { Container, makeStyles, Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import "../Styles/App.css";
import { StyledInput, StyledTextArea } from "../Styles/StyledComp";
import Headers from "../Header";
import { METHODS } from "http";

const useStyles = makeStyles(theme => ({
  root: {
    background: "white",
    color: "whitesmoke",
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

const AddCard = props => {
  const [cardData, setCardData] = React.useState({});
  const [message, setMessage] = React.useState("");
  const [isSpinning, setSpinner] = React.useState(true);
  const [userData, setUserData] = React.useState({});
  const classes = useStyles();

  useEffect(() => {
    const getUserInfo = async () => {
      const resp = await fetch("/auth/getUserInfo");
      const res = await resp.json();
      console.log(res);
      setUserData(res);
    };

    getUserInfo();
    setSpinner(false);
  }, []);

  const handleChange = e => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    const sendData = async () => {
      const resp = await fetch("/card/addCard", {
        method: "POST",
        headers: Headers.headers,
        body: JSON.stringify({ cardData, userData })
      });
      const data = await resp.json();
      setMessage(data.message);
    };
    sendData();
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
        <h3>{message}</h3>
        <Paper className={classes.root} id="paper">
          <form onChange={handleChange}>
            <br />
            <StyledInput type="text" placeholder="Title" name="title" />
            <br />
            <br />
            <StyledTextArea
              type="textarea"
              placeholder="Code here.."
              cols={35}
              rows={15}
              name="code"
              id="code"
            />
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleSubmit}
            >
              Add Card
            </Button>
            <br />
            <br />
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default AddCard;

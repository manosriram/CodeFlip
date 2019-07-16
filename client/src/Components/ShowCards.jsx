import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import "../Styles/App.css";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Highlight from "react-highlight.js";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    flexGrow: 1
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default
  }
}));
const ShowCards = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [cardData, setCardData] = React.useState([{}]);
  let [activeStep, setActiveStep] = React.useState(0);
  const [isSpinning, setSpinner] = React.useState(true);
  const maxSteps = cardData.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  useEffect(() => {
    const getUserCards = async () => {
      const resp = await fetch("/card/showCards");
      const data = await resp.json();
      setCardData(data.rest);
      console.log(data.rest);
    };

    getUserCards();
    setSpinner(false);
  }, []);

  if (isSpinning) {
    return (
      <div className="spinner-border" role="status" id="spinner">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (cardData.length == 0)
    return (
      <>
        <Container>
          <h5>No Cards Yet.. 😕</h5>
        </Container>
      </>
    );
  else {
    return (
      <>
        <Container className={classes.root}>
          <div className={classes.root}>
            <Paper square elevation={0} className={classes.header}>
              <Typography>{cardData[activeStep].TITLE}</Typography>
            </Paper>
            <br />
            <div id="cardCode">
              <Highlight language={cardData[activeStep].LANGUAGE}>
                {cardData[activeStep].CODE}
              </Highlight>
            </div>
            <MobileStepper
              variant="dots"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  id="btn"
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  id="btn"
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </div>
        </Container>
      </>
    );
  }
};

export default ShowCards;

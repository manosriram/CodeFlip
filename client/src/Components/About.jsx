import React from "react";
import { Container } from "@material-ui/core";
import "../Styles/App.css";

const About = () => {
  return (
    <>
      <Container>
        <h5>
          Welcome to CodeFlip ! This is a Card-Based Website. It is really easy
          and handy to use. <br />
          <br />
          Main Purpose of this Site is to make Code-Lookup Easier !
        </h5>
        <br />
        <br />
        <h6>Here are the steps to get started.</h6>
        <ul>
          <li>Register (or) Login with your Email address.</li>
          <li>Select Add Card and fill the Title and Code Area.</li>
          <li>Select a Language.</li>
          <li>Click on Add Card.</li>
          <li>Open Show Cards to View your saved Cards.</li>
        </ul>
        <br />
        <br />
        <br />
        <p>
          Found a Bug ? Send a Mail to <strong>mano.sriram0@gmail.com</strong>
        </p>
      </Container>
      <div id="footer">
        <p>Made with ❤️ by Mano Sriram.</p>
      </div>
    </>
  );
};

export default About;

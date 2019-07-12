import React from "react";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
      <Container>
        <h3>
          Welcome to Flip-Code. <Link to="/login">Login</Link> or{" "}
          <Link to="/register">Register</Link> to Get Started.
        </h3>
      </Container>
    </>
  );
};

export default Index;

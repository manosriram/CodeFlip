import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Index from "./Components/Index";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Navbar} />
      <Route exact path="/" component={Index} />
    </BrowserRouter>
  );
};

export default App;

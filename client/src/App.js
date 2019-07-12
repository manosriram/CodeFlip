import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Index from "./Components/Index";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Navbar} />
      <Route exact path="/" component={Index} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </BrowserRouter>
  );
};

export default App;

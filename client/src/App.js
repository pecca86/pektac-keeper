import "./App.css";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home.js";
import About from "./components/pages/About";
import ContactSate from "./context/contact/ContactState";

const App = () => {
  return (
    <ContactSate>
      <Router>
        <Fragment>
          <Navbar title="Pektac-keeper" />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ContactSate>
  );
};

export default App;

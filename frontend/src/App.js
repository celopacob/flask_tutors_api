import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutor from "./components/add-tutor.component";
import Tutor from "./components/tutor.component";
import TutorsList from "./components/tutors-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/tutors" className="navbar-brand">
            TutorMatch
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutors"} className="nav-link">
                Tutors
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/tutors"]} component={TutorsList} />
            <Route exact path="/add" component={AddTutor} />
            <Route path="/tutors/:id" component={Tutor} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

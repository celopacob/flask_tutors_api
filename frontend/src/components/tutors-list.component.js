import React, { Component } from "react";
import TutorDataService from "../services/tutor.service";
import { Link } from "react-router-dom";

export default class TutorsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveTutors = this.retrieveTutors.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutor = this.setActiveTutor.bind(this);

    this.state = {
      tutors: [],
      currentTutor: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveTutors();
  }

  retrieveTutors() {
    TutorDataService.getAll()
      .then(response => {
        this.setState({
          tutors: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutors();
    this.setState({
      currentTutor: null,
      currentIndex: -1
    });
  }

  setActiveTutor(tutor, index) {
    this.setState({
      currentTutor: tutor,
      currentIndex: index
    });
  }

  render() {
    const { tutors, currentTutor, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Tutors List</h4>

          <ul className="list-group">
            {tutors &&
              tutors.map((tutor, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutor(tutor, index)}
                  key={index}
                >
                  {tutor.first_name} {tutor.last_name} 
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentTutor ? (
            <div>
              <h4>Tutor</h4>
              <div>
                <label>
                  <strong>First Name:</strong>
                </label>{" "}
                {currentTutor.first_name}
              </div>
              <div>
                <label>
                  <strong>Last Name:</strong>
                </label>{" "}
                {currentTutor.last_name}
              </div>

              <Link
                to={"/tutors/" + currentTutor.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutor...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
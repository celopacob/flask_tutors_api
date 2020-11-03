import React, { Component } from "react";
import TutorDataService from "../services/tutor.service";

export default class Tutor extends Component {
  constructor(props) {
    super(props);
    this.getTutor = this.getTutor.bind(this);
    this.deleteTutor = this.deleteTutor.bind(this);

    this.state = {
      currentTutor: {
        id: null,
        first_name: "",
        last_name: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTutor(this.props.match.params.id);
  }

  getTutor(id) {
    TutorDataService.get(id)
      .then(response => {
        this.setState({
          currentTutor: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTutor() {    
    TutorDataService.delete(this.state.currentTutor.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tutors')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTutor } = this.state;

    return (
      <div>
        {currentTutor ? (
          <div className="edit-form">
            <h4>Tutor</h4>
            <form>
              <div className="form-group">
                <label htmlFor="firstName">{currentTutor.first_name}
                &nbsp;
                <label htmlFor="lastName">{currentTutor.last_name}</label></label>
              </div>
            </form>
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutor}
            >
              Delete
            </button>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}
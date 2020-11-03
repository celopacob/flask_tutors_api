import React, { Component } from "react";
import TutorDataService from "../services/tutor.service";

export default class AddTutor extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.saveTutor = this.saveTutor.bind(this);
    this.newTutor = this.newTutor.bind(this);

    this.state = {
      id: null,
      firstName: "",
      lastName: "",

      submitted: false
    };
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  saveTutor() {
    var data = {
      first_name: this.state.firstName,
      last_name: this.state.lastName
    };

    TutorDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          firstName: response.data.title,
          lastName: response.data.description,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutor() {
    this.setState({
      id: null,
      firstName: "",
      lastName: "",

      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newTutor}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  required
                  value={this.state.title}
                  onChange={this.onChangeFirstName}
                  name="firstName"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  required
                  value={this.state.lastName}
                  onChange={this.onChangeLastName}
                  name="lastName"
                />
              </div>
  
              <button onClick={this.saveTutor} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
    );
  }
}
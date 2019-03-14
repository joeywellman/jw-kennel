import React, { Component } from "react";
import UserManager from "../../modules/UserManager";

export default class UserForm extends Component {
  // Set initial State:
  state = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    errorMessage: ""
  };

  // UPDATE whatever the User types in to State (as they type):
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewUser = evt => {
    evt.preventDefault();

    // Before anything additional actions are performed, make sure two passwords match:
    if (this.state.password !== this.state.passwordConfirm) {
      const errorMessage = "Your passwords did not match. Please try again.";
      this.setState({ errorMessage: errorMessage });
      return null; // Returning null bumps out of the function so the rest of the fx doesnt' run.
    }

    // Build User object for the database:
    const userToPost = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    // When the User filled out the register form, an email address was entered.
    // Need to make sure that e-mail address is unique, so =search the database for other Users who may have it:
    UserManager.getByEmail(this.state.email).then(user => {
      // If that e-mail address already exists in the database, throw a helpful error message:
      if (user.length > 0) {
        const errorMessage =
          "Sorry, that email already exists. Would you like to Log In instead?";
        this.setState({ errorMessage: errorMessage });
      } else {
        // If e-mail isn't in the db, go ahead and register:
        this.props
        .registerUser(userToPost)
        .then(user => {
          console.log(user);
          sessionStorage.setItem("credentials", JSON.stringify(user.id));
          // this.props.history.push("/");
          // this.props.refreshUsers(); // This function is in our ApplicationViews component. It fetchs all the Users from the db and sets them to state in ApplicationViews so that new user is seen when we go to the /user route.
        });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <h3 className="animal">Register as a User</h3>
        <form id="animalformwindow" className="animalForm">
          <div id="inputwindow">
            <div className="form-group col-auto">
              <label className="bold-name" htmlFor="name">Name:</label>
              <input
                type="text"
                required
                className="grayText form-control text-center"
                onChange={this.handleFieldChange}
                id="name"
                placeholder="Your Name"
              />
            </div>
            <div className="form-group col-auto">
              <label className="bold-name" htmlFor="email">Email:</label>
              <input
                type="email"
                required
                className="grayText form-control text-center"
                onChange={this.handleFieldChange}
                id="email"
                placeholder="Your E-Mail"
              />
            </div>
            <div className="form-group col-auto">
              <label className="bold-name" htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                className="grayText form-control text-center"
                onChange={this.handleFieldChange}
                placeholder="Create a Password"
              />
            </div>
            <div className="form-group col-auto">
              <label className="bold-name" htmlFor="passwordConfirm">Confirm Password:</label>
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                className="grayText form-control text-center"
                onChange={this.handleFieldChange}
                placeholder="Confirm Your Password"
              />
            </div>
            <div id="inputcontainer">
              <button
                type="submit"
                onClick={this.constructNewUser}
                className="btn btn-primary"
                id="credregBtn"
              ><b>Submit</b></button>
            </div>
          </div>
        </form>
        <div>
          <h4 id = "errorMsg">{this.state.errorMessage}</h4>
        </div>
      </React.Fragment>
    );
  }
}
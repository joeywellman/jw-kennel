import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UserManager from "../../modules/UserManager";
import './Login.css';

export default class Login extends Component {
  // Set INITIAL state:
  state = {
    email: "",
    password: "",
    remeberMe: false,
    errorMessage: ""
  };
  // Temporary Redirect:
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/employees' />
    }
  }

  // UPDATE state whenever an input field is EDITED:
  handleFieldChange = evt => {
    // Build empty object:
    const stateToChange = {};
    console.log(evt.target.id, evt.target.value);
    // If the input was a checkbox, want to store a boolean in state so syntax is different:
    if (evt.target.type === "checkbox") {
      stateToChange[evt.target.id] = evt.target.checked;
    } else {
      stateToChange[evt.target.id] = evt.target.value;
    }
    this.setState(stateToChange);
  };

  // Simplistic HANDLER for login submit:
  handleLogin = e => {
    e.preventDefault();

    // Local method for validation, creating animal object, and invoking function reference passed from parent component:
    // credentialLogin = evt => {
    //   evt.preventDefault();
    //   if (this.state.email === "") {
    //     window.alert("Please input email.");
    //   if (this.state.password === "") {
    //     window.alert("Please input password.");
    //   } else {
    //     const login = {
    //       email: this.state.animalEmail,
    //       password: this.state.animalPassword,
    //       employeeId: this.props.employees.find(
    //         employee => employee.name === this.state.employee
    //       ).id
    //     };

    // For now, just store the email and password that the customer enters into local storage:
    // sessionStorage.setItem(
    //   "credentials",
    //   JSON.stringify({
    //     email: this.state.email,
    //     password: this.state.password
    //   })
    // );

    // When the user logs in, search the database for their email address to bring up the rest of their info (password, etc)
    UserManager.getByEmail(this.state.email).then(user => {
      let errorMessage = "";
      if (user.length === 0) {
        // If nothing comes back from the db, that user doesn't exist yet and we should tell them that they should create an account
        errorMessage =
          "We couldn't find that email address in our records. Would you like to create an account?";
        this.setState({ errorMessage: errorMessage });
      } else {
        // If their passwords match, go ahead and put their id in storage
        if (user[0].password === this.state.password) {
          this.state.remeberMe
            ? localStorage.setItem(
              "credentials",
              JSON.stringify(user[0].id)
            )
            : sessionStorage.setItem(
              "credentials",
              JSON.stringify(user[0].id)
            );
          this.props.history.push("/");
        } else {
          // if their passwords don't match, throw an error message
          errorMessage = "Your password was incorrect. Please try again.";
          this.setState({ errorMessage: errorMessage });
        }
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <section className="login">
          <h3><u>Login</u></h3>
          <p>You must log in to access <b>Animals</b>,<br></br>
            <b>Employees</b>, and <b>Locations</b> Information.</p>
          <div className="creds">
            <div id="credentialformwindow">
              <div id="credentialwindow">
                <form id="form-group col-auto" className="credentialForm" onSubmit={this.handleLogin}>
                  <div className="form-group col-auto">
                    <h5 className="">Please Sign In: </h5>
                  </div>
                  <div className="form-group col-auto">
                    <label className="bold-name" htmlFor="inputEmail">Email Address: </label>
                    <input className="grayText form-control text-center" onChange={this.handleFieldChange} type="email" id="email" placeholder="E-mail Address" required="" autoFocus="" />
                  </div>
                  <div className="form-group col-auto">
                    <label className="bold-name" htmlFor="inputPassword">Password: </label>
                    <input className="grayText form-control text-center" onChange={this.handleFieldChange} type="password" id="password" placeholder="Password" required="" />
                  </div>
                  <div>
                    <button className="btn btn-success" id="credsuccessBtn" type="submit"><b>Sign In</b></button>
                  </div>
                  <div>
                    <button className="btn btn-primary btn-lg btn-block" id="credcreateBtn" onClick={() => this.props.history.push("/register")}><b>Create an Account</b></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div><h4 id = "errorMsg">{this.state.errorMessage}</h4></div>
        </section>
      </React.Fragment>
    );
  }
}

// {this.renderRedirect()}
// <button className="btn btn-success" id="credsuccessBtn" type="submit" onClick={this.setRedirect}><b>Sign In</b></button>

// form id="form-group col-auto" className="credentialForm" onSubmit={this.handleLogin}

// export default class Login
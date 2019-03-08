import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';

export default class Login extends Component {
  // Set INITIAL state:
  state = {
    email: "",
    password: ""
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
    const stateToChange = {};
    console.log(evt.target.id, evt.target.value);
    stateToChange[evt.target.id] = evt.target.value;
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
    sessionStorage.setItem(
      "credentials",
      JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    );
  };

  render() {
    return (
      <section className="login">
        <h3><u>Login</u></h3>
        <div className="creds">
          <div id="credentialformwindow">
            <div id="credentialwindow">
              <form id="form-group col-auto" className="credentialForm" onSubmit={this.handleLogin}>
              <div className="form-group col-auto">
                <h5 className="">Please Sign In: </h5>
              </div>
                <div className="form-group col-auto">
                  <label className="bold-name" htmlFor="inputEmail">Email Address: </label>
                  <input className="grayText form-control text-center" onChange={this.handleFieldChange} type="email" id="email" placeholder="Email address" required="" autoFocus="" />
                </div>
                <div className="form-group col-auto">
                  <label className="bold-name" htmlFor="inputPassword">Password: </label>
                  <input className="grayText form-control text-center" onChange={this.handleFieldChange} type="password" id="password" placeholder="Password" required="" />
                </div>
                <div>
                  <button className="btn btn-success" id="credsuccessBtn" type="submit"><b>Sign In</b></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

// {this.renderRedirect()}
// <button className="btn btn-success" id="credsuccessBtn" type="submit" onClick={this.setRedirect}><b>Sign In</b></button>

// form id="form-group col-auto" className="credentialForm" onSubmit={this.handleLogin}

// export default class Login
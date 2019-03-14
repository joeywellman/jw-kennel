import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import "./Kennel.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Kennel extends Component {

    // Check to see if "credentials" are in Local Storage.
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

// export default Kennel
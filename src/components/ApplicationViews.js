// Create React App:
// npx create-react-app [Insert Name of Application / Location]
// cd [Insert Name of Application / Location]
// npm start

// Open a new terminal window, and start NPM with the following command(s):
// From "kennel" folder:
// npm start

// Open a new terminal window, and start API with the following command(s):
// From "kennel" folder:
// json-server -p 5002 -w api/kennel.json
// From "api" folder:
// json-server -p 5002 -w kennel.json

// Temporarily remove "import Redirect" from "react-router-dom";
import { Route, Redirect } from 'react-router-dom';
// import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import AnimalList from './animal/AnimalList';
import LocationList from './location/LocationList';
import EmployeeList from './employee/EmployeeList';
import AnimalManager from "../modules/AnimalManager";
import LocationManager from '../modules/LocationManager';
import EmployeeManager from '../modules/EmployeeManager';
import OwnerManager from '../modules/OwnerManager';
import AnimalDetail from './animal/AnimalDetail';
import AnimalForm from './animal/AnimalForm';
// Temporarily remove "import Login" from "./animal/AnimalForm";
import Login from "./authentication/Login";
// Along with initial Routing:
// <Route exact path="/login" component={Login} />

// Export Default Combined with Definition
// Note that in this component, the ApplicationViews component is being exported as soon as it is defined.
// This is a perfectly acceptable way to do an export in React, especially when there is only one component to export.
// Components will be exported immediately, instead of after the definition.
export default class ApplicationViews extends Component {
  // Populating React Component State from an API...
  state = {
    // Render the component to the DOM without any data.
    // Empty out current hard-coded state in the ApplicationViews component:
    // Reconfigure it to query the entire API and populate this data structure.
    animals: [],
    employees: [],
    locations: [],
    owners: []
    // Populate the API from JSON (why the arrays / data structure are empty, above).
  };

  // Check to see if "credentials" are in Local Storage.
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

  deleteAnimal = id => {
    return fetch(`http://localhost:5002/animals/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(() => fetch(`http://localhost:5002/animals`))
      .then(response => response.json())
      .then(animals => this.setState({ animals: animals }));
  };

  addAnimal = animal =>
    AnimalManager.post(animal)
      .then(() => AnimalManager.getAll())
      .then(animals => this.setState({ animals: animals }));

  // In React, retrieving state from a remote API works in, what seems like, a counterintuitive way.
  // React must FIRST render the component to the DOM without any data (SEE ABOVE), and THEN request the data and re-render the component.
  // One of the lifecycle methods available to every React component is componentDidMount.
  // Straight from their docs (EMPHASIS):
  // componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here.
  // If there is a need to load data from a remote endpoint, this is a good place to instantiate the network request.
  // componentDidMount() {
  // const newState = {}
  // The componentDidMount() hook runs after the component output has been rendered to the DOM, so if the component needs API data, that is the place to do it.
  // Here is how to write the component output to retrieve ANIMAL data and employee data from an API being served by json-server on port 5002:
  //         fetch(`http://localhost:5002/animals`)
  //             .then(animals => animals.json())
  //             .then(parsedAnimals => newState.animals = parsedAnimals)
  //             .then(() => fetch(`http://localhost:5002/employees`)
  //             .then(employees => employees.json()))
  //             .then(parsedEmployees => newState.employees = parsedEmployees)
  // ETC...
  // Code above fetches API in JavaScript to query API, then serializes the response as a JSON object.
  // Then, it takes the JSON object and sets the state of the component.
  // Naming Schematic:
  // "all" vs. "parsed" (allAnimals vs. parsedAnimals)
  componentDidMount() {
    AnimalManager.getAll().then(allAnimals => {
      this.setState({ animals: allAnimals });
    });

    LocationManager.getAll().then(allLocations => {
      this.setState({ locations: allLocations });
    });

    EmployeeManager.getAll().then(allEmployees => {
      this.setState({ employees: allEmployees });
    });

    OwnerManager.getAll().then(allOwners => {
      this.setState({ owners: allOwners });
    });
  }

  render() {
    return (
      // The "exact" reference tells us to print, only if the path is "/" - followed by the path.
      <React.Fragment>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" render={(props) => {
          return <LocationList locations={this.state.locations}
            {...props} />
        }} />
        <Route path="/animals" render={(props) => {
          return <AnimalList animals={this.state.animals}
            {...props}
            deleteAnimal={this.deleteAnimal}
          />
        }} />
        <Route path="/animals/:animalId(\d+)" render={props => {
          return (
            <AnimalDetail {...props}
              deleteAnimal={this.deleteAnimal}
              animals={this.state.animals}
            />
          );
        }} />
        <Route path="/animals/new" render={props => {
          return (
            <AnimalForm {...props}
              addAnimal={this.addAnimal}
              employees={this.state.employees}
            />
          );
        }} />
        <Route path="/employees" render={props => {
          if (this.isAuthenticated()) {
            return (
              <EmployeeList {...props}
                deleteEmployee={this.deleteEmployee}
                animals={this.state.animals}
                employees={this.state.employees}
                deleteAnimal={this.deleteAnimal}
              />
            );
          }
          else {
            return <Redirect to="/login" />;
          }
        }}
        />
      </React.Fragment>
    );
  }
}
// } else {
//   return <Redirect to="/login" />;

// // Removed DIV class = "container"
// // The "</React.Fragment>" was temporarily removed from the return statement (above).
// // "export default ApplicationViews" replaced by Export Default Combined with Definition
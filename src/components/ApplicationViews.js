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
import Home from "./home/Home";
import AnimalList from './animal/AnimalList';
import AnimalDetail from './animal/AnimalDetail';
import AnimalForm from './animal/AnimalForm';
import AnimalEditForm from './animal/AnimalEditForm';
import LocationList from './location/LocationList';
import EmployeeList from './employee/EmployeeList';
import OwnerList from "./owner/OwnerList";
import UserForm from "./user/UserForm";
import AnimalManager from "../modules/AnimalManager";
import LocationManager from '../modules/LocationManager';
import EmployeeManager from '../modules/EmployeeManager';
import OwnerManager from '../modules/OwnerManager';
import UserManager from '../modules/UserManager';
// Temporarily remove "import Login" from "./animal/AnimalForm";
import Questions from './questions/Questions';
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
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null;
  // isAuthenticated (){
  //   const credentials = sessionStorage.getItem("credentials");
  //   if credentials !== null){
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

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

  updateAnimal = (editedAnimalObject) => {
    return AnimalManager.put(editedAnimalObject)
      .then(() => AnimalManager.getAll())
      .then(animals => {
        this.setState({
          animals: animals
        })
      });
  };

  registerUser = UserObject =>
    UserManager.postUser(UserObject);

  refreshUsers = () =>
    UserManager.getAll().then(parsedUsrs => {
      this.setState({ users: parsedUsrs });
    });

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

    UserManager.getAll().then(allUsers => {
      this.setState({ users: allUsers });
    });
  }

  render() {
    return (
      // The "exact" reference tells us to print, only if the path is "/" - followed by the path.
      <div className="container-div">
        <Route path="/login"
          render={props => {
            return <Login {...props} />
          }} />
        <Route exact path="/"
          component={Home} />
        <Route exact path="/locations"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <LocationList
                  locations={this.state.locations}
                />
              );
            }
            else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route exact path="/animals"
          render={(props) => {
            if (this.isAuthenticated()) {
              return <AnimalList
                {...props}
                deleteAnimal={this.deleteAnimal}
                animals={this.state.animals}
              />
            }
            else {
              return <Redirect to="/login" />;
            }
          }} />
        <Route exact path="/animals/:animalId(\d+)"
          render={props => {
            return (
              <AnimalDetail
                {...props}
                deleteAnimal={this.deleteAnimal}
                animals={this.state.animals}
              />
            );
          }} />
        <Route path="/animals/new"
          render={props => {
            return (
              <AnimalForm
                {...props}
                addAnimal={this.addAnimal}
                employees={this.state.employees}
              />
            );
          }} />
        <Route
          path="/animals/:animalId(\d+)/edit"
          render={props => {
            return <AnimalEditForm
              {...props}
              employees={this.state.employees}
              updateAnimal={this.updateAnimal} />
          }}
        />
        <Route exact path="/employees"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <EmployeeList
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
        <Route
          path="/register"
          render={props => {
            return (
              <UserForm
                {...props}
                registerUser={this.registerUser}
                refreshUsers={this.refreshUsers}
              />
            );
          }}
        />
        <Route
          path="/owners"
          render={props => {
            return this.isAuthenticated() ? (
              <OwnerList owners={this.state.owners} />
            ) : (
                <Redirect to="/login" />
              );
          }}
        />
        <Route exact path="/questions"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <Questions
                {...props}/>

              );
            }
            else {
              return <Redirect to="/login" />;
            }
          }}
        />
      </div>
    );
  }
}
// } else {
//   return <Redirect to="/login" />;

// // Removed DIV class = "container"
// // The "</React.Fragment>" was temporarily removed from the return statement (above).
// // "export default ApplicationViews" replaced by Export Default Combined with Definition
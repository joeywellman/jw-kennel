import React, { Component } from 'react';
import DogIcon from './DogIcon.png';
import './Animal.css';

export default class AnimalForm extends Component {

// Set INITIAL state:
  state = {
    animalName: "",
    breed: "",
    employee: ""
  };

// UPDATE state whenever an input field is EDITED:
  handleFieldChange = evt => {
    const stateToChange = {};
    console.log(evt.target.id, evt.target.value);
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

// Local method for validation, creating animal object, and invoking function reference passed from parent component:
  constructNewAnimal = evt => {
    evt.preventDefault();
    if (this.state.employee === "") {
      window.alert("Please Select a Caretaker");
    } else {
      const animal = {
        name: this.state.animalName,
        breed: this.state.breed,
        employeeId: this.props.employees.find(
          employee => employee.name === this.state.employee
        ).id
      };

  // Create the animal / redirect user to animal list:
      this.props
        .addAnimal(animal)
        .then(() => this.props.history.push("/animals"));
    }
  };

  render() {
    return (
      <React.Fragment>
        <h3 className="animal">Admit an Animal</h3>
        <form id="animalformwindow" className="animalForm">
        <div id="inputwindow">
        <center><img src={DogIcon} className="DogIcon" alt="Dog Icon" /></center>
        <br></br>
          <div className="form-group col-auto">
            <label className="bold-name" htmlFor="animalName">Animal Name: </label>
            <input type="text" required className="grayText form-control text-center" onChange={this.handleFieldChange} id="animalName" placeholder="Name of Animal"/>
          </div>
          <div className="form-group col-auto">
            <label className="bold-name" htmlFor="breed">Breed: </label>
            <input type="text" required className="grayText form-control text-center" onChange={this.handleFieldChange} id="breed" placeholder="Breed of Animal"/>
          </div>
          <div className="form-group col-auto">
            <label className="bold-name" htmlFor="employee">Assign Caretaker:</label>
            <br></br>
            <select className="grayText form-group col-auto" defaultValue="" name="employee" id="employee" onChange={this.handleFieldChange}>
              <option value="" className="form-control text-center" placeholder="Select an Employee">Select an Employee</option>
              {this.props.employees.map(ee => (
                <option key={ee.id} id={ee.id}>{ee.name}</option>
              ))}
            </select>
            </div>
            <div id="inputcontainer">
          <button type="submit" onClick={this.constructNewAnimal} className="btn btn-primary">
            <b>Assign</b>
          </button>
          </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

// export default class AnimalForm
import React, { Component } from "react"
import AnimalManager from "../../modules/AnimalManager"
import DogIcon from './DogIcon.png';

export default class AnimalEditForm extends Component {
  // Set initial state
  state = {
    animalName: "",
    breed: "",
    employeeId: ""
  }


  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  updateExistingAnimal = evt => {
    evt.preventDefault()

    if (this.state.employee === "") {
      window.alert("Please Select a Caretaker");
    } else {
      const editedAnimal = {
        id: this.props.match.params.animalId,
        name: this.state.animalName,
        breed: this.state.breed,
        employeeId: parseInt(this.state.employeeId)
      };

      this.props.updateAnimal(editedAnimal)
        .then(() => this.props.history.push("/animals"))
    }
  }

  componentDidMount() {
    AnimalManager.getOne(this.props.match.params.animalId)
      .then(animal => {
        this.setState({
          animalName: animal.name,
          breed: animal.breed,
          employeeId: animal.employeeId
        });
      });
  }


  render() {
    return (
      <React.Fragment>
        <h3 className="animal">Edit Animal</h3>
        <form id="animalformwindow" className="animalForm">
          <div id="inputwindow">
            <center><img src={DogIcon} className="DogIcon" alt="Dog Icon" /></center>
            <br></br>
            <div className="form-group col-auto">
              <label className="bold-name" htmlFor="animalName">Animal Name:</label>
              <input
                type="text"
                required
                className="grayText form-control text-center"
                onChange={this.handleFieldChange}
                id="animalName"
                value={this.state.animalName}
                placeholder="Name of Animal"
              />
            </div>
            <div className="form-group col-auto">
              <label className="bold-name" htmlFor="breed" placeholder="Breed of Animal">Breed:</label>
              <input
                type="text"
                required
                className="grayText form-control text-center"
                onChange={this.handleFieldChange}
                id="breed"
                value={this.state.breed}
              />
            </div>
            <div className="form-group col-auto">
              <label className="bold-name" htmlFor="employee">Assign to Caretaker:</label>
              <br></br>
              <select
                className="grayText form-group col-auto"
                name="employee"
                id="employeeId"
                onChange={this.handleFieldChange}
                value={this.state.employeeId}>
                <option value="" className="form-control text-center" placeholder="Select an Employee">Select an Employee:</option>
                {this.props.employees.map(e => (
                  <option className="form-control text-center" key={e.id} id={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div id="inputcontainer">
              <button
                type="submit"
                onClick={this.updateExistingAnimal}
                className="btn btn-primary"
              >
                <b>Submit</b>
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
import React, { Component } from 'react';
import './Animal.css';
import DogIcon from './DogIcon.png';

export default class AnimalDetail extends Component {
  render() {
    console.log(this.props);
    // Using the route parameter,  find animal that the user 'clicked' on by looking at the "this.props.animals" collection that was passed down from ApplicationViews.
    const animal =
      this.props.animals.find(
        a => a.id === parseInt(this.props.match.params.animalId)
      ) || {};

    return (
      <React.Fragment>
        <h3 className="animal">Selected Animal</h3>
        <section className="animalSelected">
          <div key={animal.id} className="cardDetails">
            <div className="card-body">
              <div className="card-title">
                <img src={DogIcon} className="DogIcon" alt="Dog Icon" />
                <h5>Name:</h5>
                <h4 className="bold-name">{animal.name}</h4>
                <h6 >Breed:</h6>
                <h6 className="bold-name">{animal.breed}</h6>
                <button
                  type="button"
                  className="btn btn-success"
                  id="editBtn"
                  onClick={() => {
                    this.props.history.push(`/animals/${animal.id}/edit`);
                  }}
                >
                  Edit
            </button>
                <button className="cardBtnDelete" onClick={() => this.props.deleteAnimal(animal.id)
                  .then(() => this.props.history.push("/animals"))}>Delete / <br></br>Discharge</button>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

// export default class AnimalDetail
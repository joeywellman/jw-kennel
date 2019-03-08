import React, { Component } from 'react';
import './Animal.css';
import AnimalCard from './AnimalCard';

export default class AnimalList extends Component {
  render() {
    return (
    // return (
    //   <section className="animals"> {
    //     this.props.animals.map(animal =>
    //     <div key={animal.id}>
    //       {animal.name}
    //     </div>
    //     )
    //   }</section>
    //   )
      <React.Fragment>
        <h3 className="animal">Animals</h3>
        <div className="animalBtn">
          <button type="button" className="btn btn-success" id="successBtn" onClick={() => {this.props.history.push("/animals/new");}}>
            <b>Admit an Animal</b>
          </button>
        </div>
        <section className="animals">
          {this.props.animals.map(animal => (<AnimalCard key={animal.id} animal={animal} {...this.props} />))}
        </section>
      </React.Fragment>
    );
  }
}

// Then put the AnimalList component in the JSX for Kennel:
  // export default AnimalList
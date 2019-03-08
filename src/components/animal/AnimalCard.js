import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DogIcon from './DogIcon.png';
import './Animal.css';

export default class AnimalCard extends Component {
  render() {
    return (
      <div key={this.props.animal.id} className="card-animal">
        <div className="card-body">
          <div className="card-title-animal">
            <img src={DogIcon} className="DogIcon" alt="Dog Icon" />
            <h5>Name:</h5>
            <h4 className="bold-name">{this.props.animal.name}</h4>
            <h6><Link className="nav-link" to={`/animals/${this.props.animal.id}`}><button className="cardBtnInfo">Details</button></Link></h6>
            <button className=""><a href="true" onClick={() => this.props.deleteAnimal(this.props.animal.id)} className="cardBtnDelete" alt="Remove/Discharge Animal">Discharge</a></button>
          </div>
        </div>
      </div>
    );
  }
}

// export default class AnimalCard
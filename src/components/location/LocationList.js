import React, { Component } from 'react';
import './Location.css';

// Right now, the kennel location information is JSX inside the Kennel component.
// The business wants to expand and open a new location.
// Your job is to make a new component named LocationList:
export default class LocationList extends Component {
  render() {
    // And put the names and addresses of each location in that component's JSX:
    return (
      // This is another example of Single Responsibility Principle. Since we have multiple locations now, we should have a component whose sole responsibility is to render the location information.
      // Create two locations (you can use separate section elements if you like): Nashville North with a fictitious address, and Nashville South with a fictitious address.
      <section className="locations">
        <h3 className="location">Locations</h3>
        {this.props.locations.map(location => (
          <div key={location.id}>
          <img src={require(`./${location.name}.png`)} className="LocationImage" alt="LocationImage" />
            <h4 className="bold-name">{location.name}</h4>
            <h5>{location.address}</h5>
            <h6>(Location #{location.id})</h6>
            <br></br>
          </div>
        ))}
      </section>
    );
  }
}

// Then put the LocationList component in the JSX for Kennel.
  // export default LocationList
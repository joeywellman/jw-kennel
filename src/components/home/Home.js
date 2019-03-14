import React, { Component } from 'react';
import './Home.css';

// Right now, the kennel location information is JSX inside the Kennel component.
// The business wants to expand and open a new location.
// Your job is to make a new component named LocationList:
export default class Home extends Component {
  render() {
    // And put the names and addresses of each location in that component's JSX:
    return (
      // This is another example of Single Responsibility Principle. Since we have multiple locations now, we should have a component whose sole responsibility is to render the location information.
      // Create two locations (you can use separate section elements if you like): Nashville North with a fictitious address, and Nashville South with a fictitious address.
      <section className="home-page">
        <h3 className="home">Home</h3>
        <p className="text-center">This is the <b>Home</b> Page.</p>
      </section>
    );
  }
}

// Then put the LocationList component in the JSX for Kennel.
  // export default LocationList
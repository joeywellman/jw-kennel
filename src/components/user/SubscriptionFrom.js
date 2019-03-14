import React, { Component } from "react";

export default class SubscriptionForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
        acceptedTerms: false,
        email: '',
      };
    }

    updateCheckbox(checked) {
      this.setState({
        acceptedTerms: checked,
      });
    }

    updateEmail(value) {
      this.setState({
        email: value,
      });
    }

    submit() {
      // ... use email and acceptedTerms in an ajax request or similar ...
    }

    render() {
      return (
        <form>
          <input
            type="email"
            onChange={(event) => {this.updateEmail(event.target.value)}}
            value={this.state.email}
          />
          <input
              type="checkbox"
              checked={this.state.acceptedTerms}
              onChange={(event) => {this.updateCheckbox(event.target.checked)}}
            />
          <button onClick={() => {this.submit()}}>Submit</button>
        </form>
      )
    }
  }
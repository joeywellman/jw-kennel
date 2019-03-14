import React, { Component } from 'react';
import './Owner.css';

export default class OwnerList extends Component {
    render() {
        return (
            <React.Fragment>
                <h3 className="owner">Owners</h3>
                <div className="col-2 mx-auto">
                    <ul className="">
                        {this.props.owners.map(owner =>
                            <li key={owner.id} className="grayText">
                                <h4 className="bold-center-name">{owner.name}</h4>
                            </li>
                        )
                        }
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

// Then put the OwnerList component in the JSX for Kennel (this has been moved to the top).
// export default OwnerList
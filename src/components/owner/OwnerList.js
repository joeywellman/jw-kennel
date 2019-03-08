import React, { Component } from 'react';

export default class OwnerList extends Component {
    render() {
        return (
            <section className="owners">
            <h1>Owners</h1>
            {this.props.owners.map(owner =>
                <div key={owner.id}>
                    {owner.name}
                </div>
            )
            }
            </section>
         )
    }
}

// Then put the OwnerList component in the JSX for Kennel (this has been moved to the top).
// export default OwnerList
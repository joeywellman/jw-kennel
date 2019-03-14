import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class NavBar extends Component {
    // When Users click logout button, clear both local and session storage:
    logout() {
        sessionStorage.clear();
        localStorage.clear();
    }
    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills font-weight-bold">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/employees">Employees</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/animals">Animals</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/owners">Owners</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/locations">Locations</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/questions">Questions</Link>
                    </li>
                    <li className="nav-item">
                        {/* This is a ternary statement!! It checks to see if there's anything in either local or session storage. If so, it renders the "Sign out" button. If not, it renders a "Log in" button */}
                        {sessionStorage.getItem("credentials") === null &&
                            localStorage.getItem("credentials") === null ? (
                                <Link className="nav-link" to="/login">Sign In</Link>) : (
                                <Link className="nav-link" to="/" onClick={this.logout}>Sign Out</Link>)
                        }
                    </li>
                </ul>
            </nav>
        )
    }
}

// export default NavBar
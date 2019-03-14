import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';
import Kennel from './components/Kennel';
import * as serviceWorker from './serviceWorker';

import './index.css'
// This only takes one component [ever].
ReactDOM.render(
    <Router>
        <Kennel />
    </Router>
    , document.getElementById('root'))

    serviceWorker.unregister();
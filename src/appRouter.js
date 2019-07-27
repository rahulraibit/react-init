import React from 'react';
import { Router, Route } from 'react-router'
import App from './App'
import about from './container/about/about'
import { createBrowserHistory } from 'history'
import home from './container/home/home'
const history = createBrowserHistory();

export const route = (
    <Router history={history}>
        <App id="LAYOUT">
            <Route exact path="/" component={home} id="home" />
            <Route path="/home" component={home} id="home" />
            <Route path="/about" component={about} id="about" />
        </App>
    </Router>
)


import React from 'react';
import { Provider } from 'react-redux'
import configureStore from './store';
import { Router, Route } from 'react-router'
import App from './App'
import { createBrowserHistory } from 'history'
import { TODO } from './container/index'

const history = createBrowserHistory();
export const store = configureStore();

export const route = (
    <Provider store={store}>
        <Router history={history}>
            <App id="LAYOUT">
                <Route exact path="/" component={TODO} id="todo" />
                <Route path="/todo" component={TODO} id="todo" />
            </App>
        </Router>
    </Provider>
)


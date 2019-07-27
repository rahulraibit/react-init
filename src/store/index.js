import { createStore, applyMiddleware } from "redux";

// // Logger with default options
// import logger from "redux-logger";

import thunk from 'redux-thunk'
import { reducer } from "../reducers";

export default function configureStore(initialState) {
  const store = createStore(reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    initialState, applyMiddleware(thunk));
  return store;
}

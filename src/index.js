// library imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import { applyMiddleware, createStore } from 'redux';
// import { Provider } from 'react-redux';
// import logger from 'redux-logger';
// import thunk from 'redux-thunk';

// functionality imports
import App from './App';
// import { rootReducer } from './store'

// style import
import './index.css';


// const store = createStore(rootReducer, applyMiddleware(thunk, logger))

ReactDOM.render(
    <Router>
      {/* <Provider store={store}> */}
        <App />
      {/* </Provider> */}
    </Router>,
  document.getElementById('root')
);


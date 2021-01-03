import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { PersistGate } from 'redux-persist/integration/react';

//we now has access to redux in our application
import  {persistor,store}  from './redux/store';


import reportWebVitals from './reportWebVitals';

//Provider is a parent component of everything that provides access to the store and other redux properties.
import { Provider } from 'react-redux';

//persistor that is being passed in the persistGate is the persisted version of our app. 
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

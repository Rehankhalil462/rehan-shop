import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider}  from 'react-redux';
//Provider is a parent component of everything that provides access to the store and other redux properties.
import store from './redux/store';
//we now has access to redux in our application

ReactDOM.render(<Provider store={store}><BrowserRouter>  <App /></BrowserRouter></Provider> ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

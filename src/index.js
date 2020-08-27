import React from 'react';
import ReactDOM from 'react-dom';

import './util/global/global.css';
import './util/global/content-styles.css'
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from "./redux/";

import * as serviceWorker from './serviceWorker';

import * as firebase from 'firebase/app';
import "firebase/auth";

import { StylesProvider } from '@material-ui/core/styles';

// --- Setting up Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDRzS7x4Y1pOHEe-nfR_J0HDUudLGwlR_E",
  authDomain: "ideadb-a9c14.firebaseapp.com",
  databaseURL: "https://ideadb-a9c14.firebaseio.com",
  projectId: "ideadb-a9c14",
  storageBucket: "ideadb-a9c14.appspot.com",
  messagingSenderId: "525138405304",
  appId: "1:525138405304:web:5ec3ca599e834f06c0914d",
  measurementId: "G-XXBBWC1213"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

// --- Setting up Redux & Redux Dev Tools
const store = createStore(
  RootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <StylesProvider injectFirst>
          <App />
    </StylesProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

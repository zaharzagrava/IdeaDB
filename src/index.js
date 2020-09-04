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

// --- Loading AppSync
// import AWSAppSyncClient from "aws-appsync";
// import { ApolloProvider } from "react-apollo";
// import { Rehydrated } from "aws-appsync-react";
// import appSyncConfiguration from "./appsyncconfiguration.json";
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';

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

// // --- Setting up AppSync
// const appSyncClient = new AWSAppSyncClient({
//   url: appSyncConfiguration.AppSync.Default.ApiUrl,
//   region: appSyncConfiguration.AppSync.Default.Region,
//   auth: {
//     type: appSyncConfiguration.AppSync.Default.AuthMode,
//     apiKey: appSyncConfiguration.AppSync.Default.ApiKey
//   }
// })
Amplify.configure(awsconfig);

ReactDOM.render(
  // <ApolloProvider client={appSyncClient}>
  //   <Rehydrated>
      <Provider store={store}>
        <StylesProvider injectFirst>
          <App />
        </StylesProvider>
      </Provider>,
  //   </Rehydrated>
  // </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

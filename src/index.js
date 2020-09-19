import React from 'react';
import ReactDOM from 'react-dom';
import './util/global/global.css';
import './util/global/content-styles.css';
import '../node_modules/firebaseui/dist/firebaseui.css';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './redux/';

import * as serviceWorker from './serviceWorker';
import { StylesProvider } from '@material-ui/core/styles';
// --- Loading Amplify
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

// --- Setting up Redux & Redux Dev Tools
const store = createStore(
  RootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// --- Seting up Amplify
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

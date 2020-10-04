import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// --- Importing Service Worker
import * as serviceWorker from './serviceWorker';

// Importing CSS Styles
import './utils/global/global.css';
import './utils/global/content-styles.css';
import '../node_modules/firebaseui/dist/firebaseui.css';
import { StylesProvider } from '@material-ui/core/styles';

// --- Importing Apollo Client
import { ApolloProvider } from '@apollo/client';
import { client } from './backendapi/graphql';

// --- Importing Redux
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './redux/';

// IMporting React Query Dev Tools
import { ReactQueryDevtools } from 'react-query-devtools';
import Alphas from './components/Alphas/Alphas';

//
import { worker } from './test/setupWorker';

// --- Setting up Redux & Redux Dev Tools
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer, composeEnhancers());

worker.start();

ReactDOM.render(
  <>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <React.StrictMode>
          <StylesProvider>
            <Alphas />
          </StylesProvider>
        </React.StrictMode>
      </Provider>
    </ApolloProvider>
    <ReactQueryDevtools />
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
// --- Loading Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from '../src/redux';

import addons from '@storybook/addons';
import { addDecorator } from '@storybook/react';

import withRedux from 'addon-redux/withRedux';
import withReduxEnhancer from 'addon-redux/enhancer';

// --- Setting up Redux
const store = createStore(RootReducer, withReduxEnhancer);

const withReduxSettings = {
  Provider,
  store,
  state: {},
  actions: [],
};

const withReduxDecorator = withRedux(addons)(withReduxSettings);

// Importing @storybook/addon-viewport
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

// Importing & Setting up @storybook/addon-console
import { withConsole } from '@storybook/addon-console';
const withConsoleDecorator = (storyFn, context) =>
  withConsole()(storyFn)(context);

if (
  typeof global.process === 'undefined' &&
  process.env.REACT_APP_MODE === 'front-end'
) {
  const { worker } = require('../src/test/setupWorker');
  worker.start();
}

// const withMSWDecorator = (storyFn) => {
//   if (
//     typeof global.process === 'undefined' &&
//     process.env.REACT_APP_MODE === 'front-end'
//   ) {
//     const { worker } = require('../src/test/setupWorker');
//     worker.start();
//   }
//   return <>{storyFn()}</>;
// };

const withStrictMode = (storyFn) => {
  return <React.StrictMode>{storyFn()}</React.StrictMode>;
};

// --- setting up parameteres
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
    },
  },
  // defaultViewport
};

// --- setting up decorators
export const decorators = [
  withReduxDecorator,
  withConsoleDecorator,
  withStrictMode,
];

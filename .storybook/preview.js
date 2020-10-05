import React from 'react';
// --- Loading Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from '../src/redux';

import addons from '@storybook/addons';
import { addDecorator } from '@storybook/react';

import withRedux from 'addon-redux/withRedux';
import withReduxEnhancer from 'addon-redux/enhancer';

// Importing CSS Styles
import '../src/utils/global/global.css';
import '../src/utils/global/content-styles.css';
import '../node_modules/firebaseui/dist/firebaseui.css';

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

if (
  typeof global.process === 'undefined' &&
  process.env.STORYBOOK_MODE === 'front-end'
) {
  const { worker } = require('../src/test/setupWorker');
  worker.start();
}

// const withMSWDecorator = (storyFn) => {
//   if (
//     typeof global.process === 'undefined' &&
//     process.env.MODE === 'front-end'
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
  layout: 'fullscreen',
};

// --- setting up decorators
export const decorators = [withReduxDecorator, withStrictMode];

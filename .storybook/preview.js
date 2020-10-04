// --- Loading Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from '../src/redux';

import addons from '@storybook/addons';

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

// console.log('@process.env.STORYBOOK_MODE');
// console.log(process.env.STORYBOOK_MODE);
// if (
//   typeof global.process === 'undefined' &&
//   process.env.STORYBOOK_MODE === 'front-end'
// ) {
//   const { worker } = require('../src/test/setupWorker');
//   console.log('@setupWorker');
//   // Start the mocking when each story is loaded.
//   // Repetitive calls to the `.start()` method do not register a new worker,
//   // but check whether there's an existing once, reusing it, if so.
//   worker.start();
// }

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
export const decorators = [withReduxDecorator, withConsoleDecorator];

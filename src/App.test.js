import React from 'react';
import { getByTestId, render } from './util/test-utils';
// import { render } from '@testing-library/react';
import App from './App';

import * as firebase from 'firebase/app';

jest.mock('./BackendCommunicator/firebase', () => {
  return {
    firebase: {
      auth: {
        GoogleAuthProvider: {
          PROVIDER_ID: 'mock',
        },
        onAuthStateChanged: jest.fn(),
      },
    },
    firebaseAuthUI: {
      start: jest.fn(),
      isPendingRedirect: jest.fn(),
    },
  };
});

test.skip('renders learn react link', () => {
  const { getByText } = render(<App />, { initialState: {} });
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

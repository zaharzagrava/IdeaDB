import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import RootReducer from '../redux/';

function wrappedRender(ui, { initialState, ...options }) {
  const store = createStore(RootReducer, initialState);

  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';

export { wrappedRender as render };

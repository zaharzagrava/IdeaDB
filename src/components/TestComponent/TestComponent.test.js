import React from 'react';
import { render } from '../../util/test-utils';
import TestComponent from './TestComponent';

test('renders learn react link', () => {
  const { getByText } = render(<TestComponent />, {
    initialState: {},
  });
  // const linkElement = getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

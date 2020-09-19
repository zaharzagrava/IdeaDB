// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { server } from './test/setupServer';

// --- Loading Amplify
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

// --- Seting up Amplify
Amplify.configure(awsconfig);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

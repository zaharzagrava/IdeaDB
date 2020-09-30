// export const firebase = {
//   auth: function () {
//     return Object.assign(
//       jest.fn(() => ({
//         currentUser: {
//           getIdToken: function () {
//             return 'MOCKED_getIdToken';
//           },
//         },
//       })),
//       {
//         GoogleAuthProvider: {
//           PROVIDER_ID: 'MOCKED_PROVIDER_ID',
//         },
//       }
//     );
//   },
// };

// export const firebaseAuthUI = {
//   start: jest.fn(),
//   isPendingRedirect: jest.fn(),
// };
export const firebase = {
  auth: function () {
    return this.__auth__;
  },
  test: jest.fn(),
  __auth__: {
    currentUser: {
      getIdToken: jest.fn(),
    },
  },
};

export const firebaseAuthUI = {
  start: jest.fn(),
  isPendingRedirect: jest.fn(),
};

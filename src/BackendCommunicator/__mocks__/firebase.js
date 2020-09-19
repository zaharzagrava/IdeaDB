export const firebase = {
  auth: function () {
    return {
      currentUser: {
        getIdToken: function () {
          return 'MOCKED_TOKEN';
        },
      },
    };
  },
};

export const firebaseAuthUI = {
  start: jest.fn(),
  isPendingRedirect: jest.fn(),
};

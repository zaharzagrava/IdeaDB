// Action Types
export const AuthActionTypes = {
  LOGGED_IN: "LOGGED_IN",
  LOGGED_OUT: "LOGGED_OUT"
}

// Inittial State
const InitialState = {
  loginStatus: false
};

// Reducer
export default function AuthReducer(state = InitialState, action) {
  let newState = null;
  switch (action.type) {
    case AuthActionTypes.LOGGED_IN:
      newState = {
        ...state,
        loginStatus: true
      }

      return newState;

    case AuthActionTypes.LOGGED_OUT:
      newState = {
        ...state,
        loginStatus: false
      }

      return newState;
    default:
      return state
  }
}

// Action Creators
export const AuthActionCreators = {
  loggedIn: function() {
    return {
      type: AuthActionTypes.LOGGED_IN
    }
  },
  loggedOut: function() {
    return {
      type: AuthActionTypes.LOGGED_OUT
    }
  },
}
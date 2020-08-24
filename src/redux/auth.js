// Action Types
export const AuthActionTypes = {
  GOOGLE_AUTH: "GOOGLE_AUTH"
}

// Inittial State
const InitialState = {
  googleAuth: null
};

// Reducer
export default function AuthReducer(state = InitialState, action) {

  switch (action.type) {
    case AuthActionTypes.GOOGLE_AUTH:
      const newState = {
        ...state,
        googleAuth: action.payload
      }

      return newState;
  
    default:
      return state
  }
}

// Action Creators
export const AuthActionCreators = {
  googleAuthInfoLoaded: function(googleAuth) {
    return {
      type: AuthActionTypes.GOOGLE_AUTH,
      payload: googleAuth
    }
  }
}
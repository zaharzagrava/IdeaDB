import produce from 'immer';

// Action Types
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const REGEX_LIST_UPDATED = 'REGEX_LIST_UPDATED';

// Actions Interfaces
interface LoggedIn {
  type: typeof LOGGED_IN;
}

interface LoggedOut {
  type: typeof LOGGED_OUT;
}

interface RegexListUpdated {
  type: typeof REGEX_LIST_UPDATED;
  payload: string[];
}

type AuthAction = LoggedIn | LoggedOut | RegexListUpdated;

export interface Auth {
  loginStatus: boolean;
  regexList: string[];
}

const initialState: Auth = {
  loginStatus: false,
  regexList: [''],
};

export default produce((draft: Auth, action: AuthAction) => {
  switch (action.type) {
    case LOGGED_IN:
      draft.loginStatus = true;
      return;

    case LOGGED_OUT:
      draft.loginStatus = false;
      return;

    case REGEX_LIST_UPDATED:
      draft.regexList = action.payload;

    default:
      return;
  }
}, initialState);

export const AuthActionCreators = {
  loggedIn: function (): AuthAction {
    return {
      type: LOGGED_IN,
    };
  },
  loggedOut: function (): AuthAction {
    return {
      type: LOGGED_OUT,
    };
  },
  regexListUpdated: function (regexList: string[]): RegexListUpdated {
    return {
      type: REGEX_LIST_UPDATED,
      payload: regexList,
    };
  },
};

import produce from 'immer';
import {
  GetKnowledgeFilesArgs,
  KnowledgeFileFields,
  Direction,
  KnowledgeFileFieldsCAPS,
} from '../types/types';

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

export type AuthAction = LoggedIn | LoggedOut | RegexListUpdated;

export interface Auth {
  loginStatus: boolean;
  knowledgeFileList: {
    querySettings: GetKnowledgeFilesArgs;
    fields: KnowledgeFileFields[];
  };
}

const initialState: Auth = {
  loginStatus: false,
  knowledgeFileList: {
    querySettings: {
      regexList: [''],
      knowledgeFileOrderSettings: [
        {
          orderDirection: Direction.DESC,
          orderField: KnowledgeFileFieldsCAPS.LAST_DATE_TIME_MODIFIED,
        },
      ],
      limit: 5,
      offset: 0,
      idToken: '',
    },
    fields: [
      KnowledgeFileFields.id,
      KnowledgeFileFields.srcText,
      KnowledgeFileFields.lastDateTimeModified,
    ],
  },
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
      draft.knowledgeFileList.querySettings.regexList = action.payload;

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

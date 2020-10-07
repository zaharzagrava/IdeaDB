import produce from 'immer';
import {
  GetKnowledgeFilesArgs,
  KnowledgeFileFields,
  Direction,
  KnowledgeFileFieldsCAPS,
} from '../types/types';

// Action Types
export const LOGIN_STATUS_UPDATED = 'LOGGED_IN_STATUS_UPDATED';
export const LOGGED_OUT = 'LOGGED_OUT';
export const REGEX_LIST_UPDATED = 'REGEX_LIST_UPDATED';
export const ID_TOKEN_UPDATED = 'ID_TOKEN_UPDATED';

// Actions Interfaces
export enum LoginStatus {
  LOGGED_OUT,
  LOGGED_IN,
  PRELOAD,
}

interface LoginStatusUpdated {
  type: typeof LOGIN_STATUS_UPDATED;
  payload: LoginStatus;
}

interface RegexListUpdated {
  type: typeof REGEX_LIST_UPDATED;
  payload: string[];
}

interface IdTokenUpdated {
  type: typeof ID_TOKEN_UPDATED;
  payload: string;
}

export type AuthAction = LoginStatusUpdated | RegexListUpdated | IdTokenUpdated;

export interface Auth {
  loginStatus: LoginStatus;
  knowledgeFileList: {
    querySettings: GetKnowledgeFilesArgs;
    fields: KnowledgeFileFields[];
  };
}

const initialState: Auth = {
  loginStatus: LoginStatus.PRELOAD,
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
    case LOGIN_STATUS_UPDATED:
      draft.loginStatus = action.payload;
      return;
    case REGEX_LIST_UPDATED:
      draft.knowledgeFileList.querySettings.regexList = action.payload;
      return;

    case ID_TOKEN_UPDATED:
      draft.knowledgeFileList.querySettings.idToken = action.payload;
      return;

    default:
      return;
  }
}, initialState);

export const AuthActionCreators = {
  loginStatusUpdated: function (
    loginInStatus: LoginStatus
  ): LoginStatusUpdated {
    return {
      type: LOGIN_STATUS_UPDATED,
      payload: loginInStatus,
    };
  },
  regexListUpdated: function (regexList: string[]): RegexListUpdated {
    return {
      type: REGEX_LIST_UPDATED,
      payload: regexList,
    };
  },
  idTokenUpdated: function (idToken: string): IdTokenUpdated {
    return {
      type: ID_TOKEN_UPDATED,
      payload: idToken,
    };
  },
};

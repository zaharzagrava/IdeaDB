import { combineReducers } from 'redux';

import KnowledgeFileReducer from './knowledgeFile';
import AuthReducer from './auth';

export const rootReducer = combineReducers({
  knowledgeFile: KnowledgeFileReducer,
  auth: AuthReducer,
});

export default rootReducer;

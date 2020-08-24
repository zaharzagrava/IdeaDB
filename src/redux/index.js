import { combineReducers } from 'redux';

import KnowledgeFileReducer from "./knowledge_file.js";
import AuthReducer from "./auth";

export default combineReducers({
  auth: AuthReducer,
  knowledge_file: KnowledgeFileReducer
});
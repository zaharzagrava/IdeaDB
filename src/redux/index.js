import { combineReducers } from 'redux';

import KnowledgeFileReducer from "./knowledge_file.js";

export default combineReducers({
  knowledge_file: KnowledgeFileReducer
});
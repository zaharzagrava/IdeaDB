import { combineReducers } from 'redux';

import KnowledgeFileReducer from "./knowledgeFile";
import AuthReducer from "./auth";
import SearchBar from "./SearchBar";

export default combineReducers({
  auth: AuthReducer,
  knowledgeFile: KnowledgeFileReducer,
  SearchBar: SearchBar
});
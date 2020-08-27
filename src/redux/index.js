import { combineReducers } from 'redux';

import KnowledgeFileReducer from "./knowledgeFile";
import PropertyReducer from "./property";
import AuthReducer from "./auth";
import SearchBar from "./SearchBar";

export default combineReducers({
  auth: AuthReducer,
  knowledgeFile: KnowledgeFileReducer,
  property: PropertyReducer,
  SearchBar: SearchBar
});
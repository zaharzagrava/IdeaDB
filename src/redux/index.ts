import { combineReducers } from 'redux';

import ClientReducer from './client';

export const rootReducer = combineReducers({
  client: ClientReducer,
});

export default rootReducer;

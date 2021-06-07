import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { registration } from './registration';
import { alert } from './alert';
import { board } from './board';

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  board
});

export default rootReducer;

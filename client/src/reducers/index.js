import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { registration } from './registration';
import { alert } from './alert';

const rootReducer = combineReducers({
  authentication,
  registration,
  alert
});

export default rootReducer;

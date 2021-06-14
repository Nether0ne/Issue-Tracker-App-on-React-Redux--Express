import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { registration } from './registration';
import { alert } from './alert';
import { board } from './board';
import { queueList } from './queue';
import { taskList } from './task';

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  board,
  queueList,
  taskList
});

export default rootReducer;

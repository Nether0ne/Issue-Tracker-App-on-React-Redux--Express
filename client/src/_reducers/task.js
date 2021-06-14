import { taskConstants } from '../_constants';

export function task(state = {}, action) {
  switch (action.type) {
    case taskConstants.ADD_TASK_REQUEST:
      return {
        processing: true
      };
    case taskConstants.ADD_TASK_SUCCESS:
      return {
        processing: false,
        success: true,
        ...action.task
      };
    case taskConstants.ADD_TASK_FAILURE:
      return {
        processing: false,
        success: false
      };
    case taskConstants.EDIT_TASK_REQUEST:
      return {
        ...state,
        processing: true
      };
    case taskConstants.EDIT_TASK_SUCCESS:
      return {
        ...state,
        ...action.task
      };
    case taskConstants.EDIT_TASK_FAILURE:
      return {
        ...state,
        processing: false,
        success: false
      };
    default:
      return state;
  }
}

export function taskList(state = [], action) {
  const list = state.length > 0 ? [...state] : [];

  switch (action.type) {
    case taskConstants.INIT_TASKLIST:
      return [];
    case taskConstants.ADD_TASKLIST:
      return [...list, action.tasks];
    case taskConstants.ADD_TASK_REQUEST:
      list.push(task(action.task, action));
      return list;
    case taskConstants.EDIT_TASKLIST_REQUEST:
    case taskConstants.EDIT_TASKLIST_SUCCESS:
    case taskConstants.EDIT_TASKLIST_FAILURE:
      return [
        ...list.slice(0, action.task.position),
        queue(action.task, action),
        ...list.slice(action.task.position + 1)
      ];
    default:
      return state;
  }
}

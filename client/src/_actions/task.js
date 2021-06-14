import { taskConstants } from '../_constants';
import { taskService } from '../_services';

export const taskActions = {
  add,
  edit,
  del,
  addList,
  initList
};

function add(params) {
  return async (dispatch) => {
    dispatch(request());

    await taskService.add(params).then(
      (task) => {
        dispatch(success(task));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: taskConstants.ADD_TASK_REQUEST };
  }

  function success(task) {
    return { type: taskConstants.ADD_TASK_SUCCESS, task };
  }

  function failure(error) {
    return { type: taskConstants.ADD_TASK_FAILURE, error };
  }
}

function edit(params) {
  return (dispatch) => {
    dispatch(request(params));

    taskService.edit(params).then(
      (task) => {
        dispatch(success(task));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(task) {
    return { type: taskConstants.EDIT_TASK_REQUEST, task };
  }

  function success(task) {
    return { type: taskConstants.EDIT_TASK_SUCCESS, task };
  }

  function failure(error) {
    return { type: taskConstants.EDIT_TASK_FAILURE, error };
  }
}

function del(params) {
  return (dispatch) => {
    dispatch(request());

    taskervice.del(params).then(
      (task) => {
        dispatch(success(task));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: taskConstants.DELETE_TASK_REQUEST };
  }

  function success(task) {
    return { type: taskConstants.DELETE_TASK_SUCCESS, task };
  }

  function failure(error) {
    return { type: taskConstants.DELETE_TASK_FAILURE, error };
  }
}

function addList(tasks) {
  return (dispatch) => {
    dispatch({
      type: taskConstants.ADD_TASKLIST,
      tasks: tasks
    });
  };
}

function initList() {
  return (dispatch) => {
    dispatch({
      type: taskConstants.INIT_TASKLIST
    });
  };
}

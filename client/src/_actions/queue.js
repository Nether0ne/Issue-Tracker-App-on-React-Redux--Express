import { queueConstants } from '../_constants';
import { queueService } from '../_services';

export const queueActions = {
  edit
};

function edit(params) {
  return dispatch => {
    dispatch(request());

    queueService.edit(params)
      .then(
        queue => {
          dispatch(success(queue))
        },
        error => {
          dispatch(failure(error))
        }
      );
  };

  function request() { return { type: queueConstants.EDIT_QUEUE_REQUEST } }

  function success(queue) { return { type: queueConstants.EDIT_QUEUE_SUCCESS, queue } }

  function failure(error) { return { type: queueConstants.EDIT_QUEUE_FAILURE, error } }
};

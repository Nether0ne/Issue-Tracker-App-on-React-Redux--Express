import { boardConstants } from '../constants';
import { boardService } from '../services';

export const boardActions = {
  getBoards
};

function getBoards() {
  return dispatch => {
    dispatch(request());

    boardService.getBoards()
      .then(
        boards => {
          dispatch(success(boards));
        },
        error => {
          dispatch(failure(error));
        }
      )
  };

  function request() { return { type: boardConstants.GET_ALL_BOARDS_REQUEST } }
  
  function success(boards) { return { type: boardConstants.GET_ALL_BOARDS_SUCCESS, boards } }
  
  function failure(error) { return { type: boardConstants.GET_ALL_BOARDS_FAILURE, error } }
}

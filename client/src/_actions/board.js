import { boardConstants } from '../_constants';
import { boardService } from '../_services';

export const boardActions = {
  getBoards,
  getBoard
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
      );
  };

  function request() { return { type: boardConstants.GET_ALL_BOARDS_REQUEST } }
  
  function success(boards) { return { type: boardConstants.GET_ALL_BOARDS_SUCCESS, boards } }
  
  function failure(error) { return { type: boardConstants.GET_ALL_BOARDS_FAILURE, error } }
}

function getBoard(id) {
  return async dispatch => {
    dispatch(request());

    await boardService.getBoard(id)
    .then(
      board => {
        dispatch(success(board));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() { return { type: boardConstants.GET_BOARD_REQUEST} }

  function success(board) { return { type: boardConstants.GET_BOARD_SUCCESS, board } }

  function failure(error) { return { type: boardConstants.GET_BOARD_FAILURE, error } }
}

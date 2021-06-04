import { boardConstants } from '../constants';

export function board(state = {}, action) {
  switch (action.type) {
    case boardConstants.GET_ALL_BOARDS_REQUEST:
      return { 
        loading: true 
      };
    case boardConstants.GET_ALL_BOARDS_SUCCESS:
      return { 
        loading: false,
        success: true,
        boards: action.boards
      };
    case boardConstants.GET_ALL_BOARDS_FAILURE:
      return { 
        loading: false,
        success: false 
      };
    default:
      return state
  }
}
import { queueConstants } from '../_constants';

export function queue(state = {}, action) {
  switch (action.type) {
    case queueConstants.EDIT_QUEUE_REQUEST:
      return { 
        processing: true 
      };
    case queueConstants.EDIT_QUEUE_SUCCESS:
      return { 
        processing: false,
        success: true,
        queue: action.queue
      };
    case queueConstants.EDIT_QUEUE_FAILURE:
      return { 
        processing: false,
        success: false 
      };
    default:
      return state
  }
}

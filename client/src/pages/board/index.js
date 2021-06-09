import React from 'react';
import { connect } from 'react-redux';

import { boardActions, queueActions } from '../../_actions';
import { Queue } from '../../_components';
import { queueConstants } from '../../_constants';

class BoardPage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  async componentDidMount() {
    const boardId = this.props.match.params.id;
    await this.props.getBoard(boardId);

    const { board } = this.props.board;
    
    if (board) {
      this.props.initQueue();
      board.queues.map((queue) => {
        this.props.pushQueue(queue);
      });
    }
  }

  render() {
    const { loading, success, board} = this.props.board;
    const { queueList } = this.props;
    
    return (
      <div className="flex flex-wrap flex-col gap-2 w-3/4 m-auto">
      {loading && <em>Loading boards...</em>}
      {!loading && !success && <span className="text-danger">Error loading board!</span>}
      {success && board && queueList &&
        <div>
          <div className="board-header">
            <h3>{board.title}</h3>
          </div>
          <div className="flex">
            {queueList.map((queue, index) => 
              <Queue queue={queue} key={index} index={index} />
            )}
          </div>
        </div>
      }
      </div>
    );
  }
};

function mapState(state) {
  const { board, authentication, queueList } = state;
  const { user } = authentication;
  return { board, user, queueList };
};

const actionCreators = {
  getBoard: boardActions.getBoard,
  pushQueue: queueActions.push,
  popQueue: queueActions.pop,
  getQueue: queueActions.get,
  initQueue: queueActions.init
};

const connectedBoardPage = connect(mapState, actionCreators)(BoardPage);
export { connectedBoardPage as BoardPage };

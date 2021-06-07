import React from 'react';
import { connect } from 'react-redux';

import { boardActions } from '../../_actions';
import { Queue } from '../../_components';

class BoardPage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    const boardId = this.props.match.params.id;
    this.props.getBoard(boardId);
  }

  render() {
    const { loading, success, board } = this.props.board;
    
    return (
      <div className="flex flex-wrap flex-col gap-2 w-3/4 m-auto">
      {loading && <em>Loading boards...</em>}
      {!loading && !success && <span className="text-danger">Error loading board!</span>}
      {success && board &&
        <div>
          <div className="board-header">
            <h3>{board.title}</h3>
          </div>
          <div className="flex">
            {board.queues.map((queue, index) => 
              <Queue queue={queue} key={index} />
            )}
          </div>
        </div>
      }
      </div>
    );
  }
};

function mapState(state) {
  const { board, authentication } = state;
  const { user } = authentication;
  return { board, user };
};

const actionCreators = {
  getBoard: boardActions.getBoard
};

const connectedBoardPage = connect(mapState, actionCreators)(BoardPage);
export { connectedBoardPage as BoardPage };

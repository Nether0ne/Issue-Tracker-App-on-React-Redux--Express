import React from 'react';
import { connect } from 'react-redux';

import { boardActions, queueActions } from '../../_actions';
import { Queue } from '../../_components';
import { queueConstants } from '../../_constants';

class BoardPage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      board: {},
      newQueue: {
        title: ''
      }
    };
    
    this.updateQueues();
    this.handleChange = this.handleChange.bind(this);
    this.handleAddQueue = this.handleAddQueue.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (this.props.board._id === nextProps.board._id);
  }

  handleChange(e, parent) {
    const { name, value } = e.target;
    this.setState({ 
      ...this.state,
      [parent] : {
        [name]: value 
      }
    });
  }

  async handleAddQueue(e) {
    e.preventDefault();

    await this.props.editBoard({
      board: {
        id: this.state.board._id,
        queue: {
          title: this.state.newQueue.title
        }
      }
    }).then(() => {      
      const { board } = this.props;
      this.setState({
        board: board,
        newQueue: {
          title: ''
        }
      });
      this.updateQueues();
    });
  }

  async componentDidMount() {
    const boardId = this.props.match.params.id;
    await this.props.getBoard(boardId).then(() => this.updateQueues());
  }

  componentWillUnmount() {
    this.props.initQueue([]);
  }

  updateQueues() {     
    const { board } = this.props;
    this.setState({
      ...this.state,
      board: board
    }) ;
    this.props.initQueue(board.queues || []);
  }

  render() {
    const { board } = this.state;
    const { queueList } = this.props;
    const { newQueue } = this.state;
    
    return (
      <div className="flex flex-wrap flex-col gap-2 w-3/4 m-auto">
      {board.loading && <em>Loading boards...</em>}
      {!board && <span className="text-danger">Error loading board!</span>}
      {board && queueList &&
        <div className="w-full">
          <div className="board-header">
            <h3>{board.title}</h3>
          </div>
          <div className="overflow-x-auto">
            <div className="flex flex-nowrap w-min">
              {queueList.length > 0 && queueList.map((queue, index) => 
                <Queue queue={queue} key={index} index={index} callback={() => { this.updateQueues() }}/>
              )}
              <div className="flex flex-col w-64 mt-4 mr-4 p-3 bg-gray-200 rounded-lg">
                <div className="input-group has-validation">
                  <input type="text" className="form-control" 
                    name="title" value={newQueue.title} placeholder="Add a list..." onChange={e => this.handleChange(e, "newQueue")}/>
                </div>
                {newQueue.title.length > 0 &&
                    <div className="flex flex-row pt-3">
                      <button className="btn btn-success" onClick={this.handleAddQueue}>Add</button>
                      <button onClick={() => this.setState({...this.state, newQueue: {title: ''}})}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  }
              </div>
            </div>
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
  editBoard: boardActions.editBoard,
  pushQueue: queueActions.push,
  popQueue: queueActions.pop,
  getQueue: queueActions.get,
  initQueue: queueActions.init
};

const connectedBoardPage = connect(mapState, actionCreators)(BoardPage);
export { connectedBoardPage as BoardPage };

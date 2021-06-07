import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { boardActions } from '../../_actions';

import './home.sass';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    this.props.getBoards();
  }

  // handleDeleteUser(id) {
  //     return (e) => this.props.deleteUser(id);
  // }

  render() {
    const { board } = this.props;
    const { loading, success, boards } = board;
    
    return (
      <div className="flex flex-wrap flex-col gap-2 self-center w-5/6 ">
        <div className="flex-col p-2">
          <h2 className="font-bold text-xl">            
            <svg className="h-6 w-6 icon text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Personal boards
          </h2>
        </div>
        {loading && <em>Loading boards...</em>}
        {!success && !loading && <span className="text-danger">Error loading boards!</span>}
        {success &&
          <div className="flex flex-row self-left gap-4 text-white font-bold">
            {boards.map((board, index) =>
              <Link to={'/board/' + board.id} key={board.id}>
              <div className="w-64 h-32 p-3 bg-indigo-500 rounded-lg hover:bg-indigo-600">
                <p className="">
                  {board.title}
                </p>
              </div>
              </Link> 
            )}
            <Link to='/board/' key="new">
              <div className="w-64 h-32 p-3 bg-indigo-500 rounded-lg hover:bg-indigo-600">
                New Board
              </div>
            </Link>
          </div>
        }        
      </div>
    );
  }
}

function mapState(state) {
  const { board, authentication } = state;
  const { user } = authentication;
  return { board, user };
}

const actionCreators = {
  getBoards: boardActions.getBoards,
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };

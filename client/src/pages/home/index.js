import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { boardActions } from '../../actions';

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
    console.log(this.props.board);
    const { loading, success, boards } = this.props.board;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h3>All boards:</h3>
        {loading && <em>Loading boards...</em>}
        {!success && <span className="text-danger">Error loading boards!</span>}
        <ul>
          {success &&
            boards.map((board, index) =>
              <li key={board.id}>
                {board.title}
              </li>
            )
          }
          <li key="new">
            New board
          </li>
        </ul>
        <p>
          <Link to="/login">Logout</Link>
        </p>
      </div>
    );
  }
}

function mapState(state) {
  const { board } = state;
  return { board };
}

const actionCreators = {
  getBoards: boardActions.getBoards,
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };

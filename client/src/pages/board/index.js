import React from 'react';
import { connect } from 'react-redux';

import { boardActions } from '../../_actions';

//import './home.sass';

class BoardPage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    //this.props.getBoards();
  }

  render() {
    
    return (
      <div className="flex flex-wrap flex-col gap-2 w-3/4 m-auto">
        Board  
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
  getBoards: boardActions.getBoards,
};

const connectedBoardPage = connect(mapState, actionCreators)(BoardPage);
export { connectedBoardPage as BoardPage };

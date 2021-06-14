import React from 'react';

import { connect } from 'react-redux';
import { taskActions } from '../../../../_actions';

class TaskCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props;

    this.state = {
      ...this.props.task,
      position: this.props.index
    };
  }

  shouldComponentUpdate(nextProps) {
    return this.props.task._id === nextProps.task._id;
  }

  render() {
    const { title } = this.state;

    return (
      <div className="px-3 py-2 mb-3 bg-white rounded-md">
        <p>{title}</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  task: state.taskList[ownProps.parentIndex][ownProps.index]
});

const actionCreators = {};

const connectedTask = connect(mapStateToProps, actionCreators)(TaskCard);
export { connectedTask as TaskCard };

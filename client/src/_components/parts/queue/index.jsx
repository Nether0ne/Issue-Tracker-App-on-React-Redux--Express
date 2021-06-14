import React from 'react';
import { connect } from 'react-redux';
import { boardActions, queueActions, taskActions } from '../../../_actions';
import { TaskCard } from '../task';

class Queue extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = this.props.queue;

    this.state = {
      ...this.state,
      editing: false,
      title: this.props.queue.title,
      position: this.props.index,
      newTask: {
        title: ''
      }
    };

    this.props.addTasks(this.props.queue.tasks);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteQueue = this.handleDeleteQueue.bind(this);
    this.handleNewTaskEdit = this.handleNewTaskEdit.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.queue._id === nextProps.queue._id;
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({
      ...this.state,
      editing: true
    });
  }

  handleNewTaskEdit(e) {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      newTask: {
        [name]: value
      }
    });
  }

  async handleAddTask(e) {
    e.preventDefault();
    const { title } = this.state.newTask;

    if (title.length > 0) {
      await this.props
        .addTask({
          queue: {
            id: this.props.queue._id
          },
          task: {
            title: title
          }
        })
        .then(() => {
          const { queue } = this.props;
          console.log(queue);
          this.setState({
            ...queue,
            newTask: {
              title: ''
            }
          });
        })
        .then(() => this.props.callback());
    }
  }

  handleDeleteQueue(e) {
    e.preventDefault();
    this.props
      .del({
        board: {
          id: this.props.board._id,
          queue: {
            id: this.props.queue._id
          }
        }
      })
      .then(() => this.props.callback());
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      ...this.state,
      editing: false
    });

    if (
      this.state.title.length > 0 &&
      this.props.queue.title !== this.state.title
    ) {
      this.props.edit(this.state);
    } else {
      this.setState({
        ...this.state,
        title: this.props.queue.title,
        editing: false
      });
    }
  }

  render() {
    const queue = this.state;
    const { taskList } = this.props;
    const { newTask } = this.state;

    return (
      <div className="flex flex-col w-64 mt-4 mr-4 p-3 bg-gray-200 rounded-lg">
        {queue.editing ? (
          <div>
            <div className="input-group has-validation">
              <input
                type="text"
                className={
                  'form-control ' +
                  (queue.editing && queue.title.length === 0
                    ? 'is-invalid'
                    : '')
                }
                name="title"
                value={queue.title}
                onChange={this.handleChange}
                onBlur={this.handleSubmit}
              />
              <div className="invalid-feedback">No queue task provided</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-row justify-between">
            <h4 className="font-bold" onDoubleClick={this.handleEdit}>
              {queue.title}
            </h4>
            <div className="dropdown">
              <a
                className="nav-link p-0"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={this.handleDeleteQueue}>
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
        {taskList && (
          <div className="flex flex-col mt-2">
            {taskList &&
              taskList.length > 0 &&
              taskList.map((task, index) => (
                <TaskCard
                  task={task}
                  key={index}
                  index={index}
                  parentIndex={this.state.position}
                />
              ))}
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                name="title"
                value={newTask.title}
                placeholder="Add task"
                onChange={this.handleNewTaskEdit}
              />
            </div>
            {newTask.title.length > 0 && (
              <div className="flex flex-row pt-3">
                <button
                  className="btn btn-success"
                  onClick={this.handleAddTask}>
                  Add
                </button>
                <button
                  onClick={() =>
                    this.setState({
                      ...this.state,
                      newTask: { title: '' }
                    })
                  }>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  queue: state.queueList[ownProps.index],
  board: state.board,
  taskList: state.taskList[ownProps.index]
});

const actionCreators = {
  edit: queueActions.edit,
  del: boardActions.deleteQueue,
  addTasks: taskActions.addList,
  addTask: taskActions.add
};

const connectedQueue = connect(mapStateToProps, actionCreators)(Queue);
export { connectedQueue as Queue };

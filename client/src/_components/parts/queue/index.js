import React from 'react';
import { connect } from 'react-redux';
import { queueActions } from '../../../_actions';
import { TaskCard } from '../task';

class Queue extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = this.props.queue;

    this.state = {    
      ...this.state,  
      editing: false,
      title: this.props.queue.title
    }
    
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (this.props.queue._id === nextProps.queue._id);
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

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      ...this.state,
       editing: false 
    });

    const { _id } = this.props.queue;

    if (this.props.queue.title !== this.state.title) {
      this.props.edit(this.state);
    }  
  }

  render() {
    const queue = this.state;
    
    return(
      <div className="flex flex-col w-64 mt-4 mr-4 p-3 bg-gray-200 rounded-lg">
        {queue.editing ? 
          <form>
            <div>
              <div className="input-group has-validation">
                <input type="text" className={'form-control ' + (queue.editing && queue.title.length === 0 ? 'is-invalid' : '')} 
                  name="title" value={queue.title} onChange={this.handleChange} onBlur={this.handleSubmit} />
                <div className="invalid-feedback">
                  No task title provided
                </div>
              </div>
            </div>
          </form>
          :
          <h4 className="font-bold" onDoubleClick={this.handleEdit}>{queue.title}</h4>
        }
        <div className="flex flex-col mt-2">
          {queue.tasks.map((task, index) => 
            <TaskCard task={task} key={index} />
          )}
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => ({
  queue: state.queueList[ownProps.index],
})

const actionCreators = {
  edit: queueActions.edit
}

const connectedQueue = connect(mapStateToProps, actionCreators)(Queue);
export { connectedQueue as Queue };

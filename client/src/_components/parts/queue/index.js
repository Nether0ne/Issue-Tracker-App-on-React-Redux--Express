import React from 'react';
import { connect } from 'react-redux';
import { queueActions } from '../../../_actions';
import { TaskCard } from '../task';

class Queue extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      editing: false,
      title: this.props.queue.title
    };
    
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    console.log(nextProps);
    return (this.props.queue.index === nextProps.queue.index);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState( { editing: true } );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState( { editing: false } );
    const { _id } = this.props.queue;

    if (this.props.queue.title !== this.state.title) {
      this.props.edit({
        position: this.props.index,
        id: _id,
        title: this.state.title
      });
    }  
  }

  render() {
    const { queue } = this.props;
    const { processing } = queue;
    console.log(this);
    const { tasks } = queue;
    const { editing, title } = this.state;
    
    return(
      <div className="flex flex-col w-64 mt-4 mr-4 p-3 bg-gray-200 rounded-lg" key={queue.id}>
        {processing && <div>processing</div>}
        {editing ? 
          <form>
            <div>
              <div className="input-group has-validation">
                <input type="text" className={'form-control ' + (editing && title.length === 0 ? 'is-invalid' : '')} 
                  name="title" value={title} onChange={this.handleChange} onBlur={this.handleSubmit} />
                <div className="invalid-feedback">
                  No task title provided
                </div>
              </div>
            </div>
          </form>
          :
          <h4 className="font-bold" onDoubleClick={this.handleEdit}>{queue.title}</h4>
        }
        {!processing ?
          <div className="flex flex-col mt-2">
            {tasks.map((task, index) => 
              <TaskCard task={task} key={index} />
            )}
          </div>
        : ''}
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

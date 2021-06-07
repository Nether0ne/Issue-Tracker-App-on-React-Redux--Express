import React from 'react';
import { TaskCard } from '../task';

export class Queue extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { queue } = this.props;

    return(
      <div className="flex flex-col w-64 mt-4 mr-4 p-3 bg-gray-200 rounded-lg" key={queue.id}>
        <h4 className="font-bold">{queue.title}</h4>
        <div className="flex flex-col mt-2">
          {queue.tasks.map((task) => 
            <TaskCard task={task} />
          )}
        </div>
      </div>
    )
  }
};

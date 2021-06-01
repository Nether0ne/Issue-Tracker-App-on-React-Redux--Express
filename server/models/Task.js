const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  //activities: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' } ], redo to comments
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }
}, {timestamps: true});

TaskSchema.methods.pushActivity = (activity) => {
  this.activities.push(activity._id);
}

mongoose.model('Task', TaskSchema);

const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema({
  title: String,
  tasks: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Task'
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

mongoose.model('Queue', QueueSchema);

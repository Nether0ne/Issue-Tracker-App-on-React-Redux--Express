const mongoose = require('mongoose');
const User = mongoose.model('User');

const actions = {
    add: 'added this card to ',
    edit: 'edited this card',
    delete: 'deleted this card from '
};

const ActivitySchema = new mongoose.Schema({
  action: String,
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  }
}, {timestamps: true});

ActivitySchema.methods.setAction = (action) => {
  if (actions[action]) {
    this.action = actions[action];
  } else {
    this.action = action;
  }
}

mongoose.model('Activity', ActivitySchema);

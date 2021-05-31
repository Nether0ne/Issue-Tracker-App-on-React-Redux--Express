const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const User = mongoose.model('User');

const BoardSchema = new mongoose.Schema({
  title: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

BoardSchema.methods.updateTitle = function(title) {
  this.title = title;
}

mongoose.model('Board', BoardSchema);

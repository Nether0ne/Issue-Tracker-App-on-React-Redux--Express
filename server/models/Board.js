const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema(
  {
    title: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    queues: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Queue'
      }
    ],
    activities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
      }
    ]
  },
  { timestamps: true }
);

BoardSchema.methods.toShortJSON = function () {
  return {
    id: this._id,
    title: this.title,
    createdBy: this.createdBy
  };
};

mongoose.model('Board', BoardSchema);

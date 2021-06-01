const router = require('express').Router();
const mongoose = require('mongoose');
const { route } = require('./user');
const Board = mongoose.model('Board');
const Queue = mongoose.model('Queue');
const Task = mongoose.model('Task');
const Activity = mongoose.model('Activity');

router.get('/board/:id', (req, res, next) => {
  Board.findById(req.params.id)
    .populate({
      path: 'queues',
      populate: {
        path : 'tasks'
      }
    })
    .populate('activities')
    .then((board) => { 
      if(!board){ return res.sendStatus(401); }

      res.json({"board" : board.toJSON()}) 
    }).catch(next);
});

router.post('/board', (req, res, next) => {
  const board = new Board();
  board.title = req.body.board.title;
  board.createdBy = '60b5112e26cad05568339c57'; // TEMP userID

  const activity = new Activity();
  activity.action = 'Created board ' + board.title + '! Congratulations!';
  //activity.createdBy = currentUserId; TODO
  
  activity.save();
  board.activities.push(activity);

  const queue = new Queue();
  queue.title = 'Test';
  
  const task = new Task();
  task.title = 'Welcome!';
  task.description = 'Let\'s start!';
  task.save();
  
  queue.tasks.push(task);
  queue.save();
  board.queues.push(queue);

  board.save().then(() => {
    return res.json({board: board})
  }).catch(next);
});

router.put('/board', (req, res, next) => {
  const params = req.body;

  Board.findById(params.board.id).then(async (board) => {
    if (!board) {
      return res.sendStatus(401); 
    }

    if (typeof params.board.title !== 'undefined') {
      board.title = req.body.board.title;
    }

    // TODO activity on one of the edit events
    // if (params.board.activity) {
    //   const activity = new Activity();
    //   activity.setAction(params.board.activity.action);
    //   activity.createdBy = params.board.activity.createdBy;
    //   activity.save();

    //   board.activities.push(activity);
    // }

    if (params.board.queue) {
      let queue = Queue.findById(params.board.queue.id);
      if (typeof queue.id === 'undefined') {
        queue = new Queue();
      }

      if (typeof params.board.queue.title !== 'undefined') {
        queue.title = params.board.queue.title;
      }
      
      if (typeof params.board.queue.task !== 'undefined') {
        let task = Task.findById(params.board.queue.task.id);

        if (!task) {
          task = new Task();
        }

        if (typeof params.board.queue.task.position !== 'undefined') { // TODO position set

        }

        if (typeof params.board.queue.task.title !== 'undefined') {
          task.title = params.board.queue.task.title;
        }

        if (typeof params.board.queue.task.description !== 'undefined') {
          task.description = params.board.queue.task.description;
        }

        task.save();        
        queue.tasks.push(task);
      }
      
      console.log(queue);
      queue.save();
      board.queues.push(queue);
    }

    return board.save();
  }).then((board) => { 
    res.json({
      "board" : board.toJSON()
    });
  }).catch(next);
});

module.exports = router;

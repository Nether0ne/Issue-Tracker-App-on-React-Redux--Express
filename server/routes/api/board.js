const router = require('express').Router();
const mongoose = require('mongoose');
const Board = mongoose.model('Board');
const Queue = mongoose.model('Queue');
const Task = mongoose.model('Task');
const Comment = mongoose.model('Comment');
const Activity = mongoose.model('Activity');
const ActivityService = require('../../services/activityService');
const auth = require('../auth'); 

router.get('/', auth.required, (req, res, next) => {
  Board.find().then((boards) => {
    if (!boards) { return 0; } // todo 401

    res.json({
      success: true,
      boards: boards.map((b) => { return b.toShortJSON(); })
    })
  }).catch(next);
});

router.get('/:id', auth.required, (req, res, next) => {
  Board.findById(req.params.id)
    .populate({
      path: 'queues',
      populate: {
        path: 'tasks'
      }
    })
    .populate('activities')
    .then((board) => {
      if (!board) { return res.sendStatus(401); }

      res.json({
        success: true,
        board: board.toJSON()
      });
    }).catch(next);
});

router.post('/', auth.required, (req, res, next) => {
  const board = new Board();
  board.title = req.body.board.title;
  board.createdBy = req.payload.id; // TEMP userID

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
    const activity = new ActivityService(
      board._id,
      'board',
      board.createdBy, {
        type: 'create'
      }
    );

    activity.log().then(() => {
      res.json({
        success: true,
        board: board.populate({
            path: 'queues',
            populate: {
              path: 'tasks'
            }
          })
          .toJSON()
      })
    });
  }).catch(next);
});

router.put('/', auth.required, (req, res, next) => {
  const params = req.body;

  Board.findById(params.board.id).then((board) => {
    if (!board) {
      return res.sendStatus(401);
    }

    if (typeof params.board.title !== 'undefined') {
      board.title = req.body.board.title;
      const activity = new ActivityService(
        board._id,
        'board',
        req.payload.id,
        {
          type: 'update'
        }
      );
      activity.log();
    }

    board.save().then((board) => {
      res.json({
        success: true,
        board: board.populate({
            path: 'queues',
            populate: {
              path: 'tasks'
            }
          })
          .populate('activities')
          .toJSON()
      });
    });
  }).catch(next);
});

router.delete('/', auth.required, (req, res, next) => {
  Board.findById(req.body.board.id).then((board) => {
    return new Promise(async(resolve, reject) => {
      if (!board) {} // todo return error
      await Activity.find({ _id: { $in: board.activities } }).then((activities) => {
        activities.forEach((a) => {
          a.delete();
        });
      }).then(async() => {
        await Queue.find({ _id: { $in: board.queues } }).then((queues) => {
          queues.forEach(async(q) => {
            await Task.find({ _id: { $in: q.tasks } }).then((tasks) => {
              tasks.forEach(async(t) => {
                await Comment.find({ _id: { $in: t.comments } }).then((comments) => {
                  comments.forEach((c) => {
                    t.comments.pull(c.id);
                    c.delete();
                  });
                }).then(() => {
                  q.tasks.pull(t.id);
                  t.delete();
                });
              });
            }).then(() => {
              board.queues.pull(q.id);
              q.delete();
            });
          });
        });
      })

      return resolve(board);
    });
  }).then((board) => {
    return board.delete();
  }).then((result) => {
    res.json({
      success: !!result
    })
  }).catch(next);
});

module.exports = router;

const { Schema, model } = require('mongoose');
const moment = require('moment');

const commentSchema = new Schema({
  commentBody: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => moment(timestamp).fromNow(),
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Comment = model('Comment', commentSchema);
module.exports = Comment;
// model/commentsModel.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  complaint_number: String,
  comment_description: String,
  comment_time: String,
  empId: { type: String, default: null }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

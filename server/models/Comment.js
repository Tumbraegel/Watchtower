const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
  {
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    film: { type: mongoose.Schema.Types.ObjectId, ref: 'Film' },
    upvotes: Array,
    downvotes: Array,
  },
  { timestamps: true }
)

module.exports = mongoose.model('Comment', CommentSchema)

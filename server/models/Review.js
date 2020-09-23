const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema(
  {
    rating: Number,
    reviewCriteria: Array,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    film: { type: mongoose.Schema.Types.ObjectId, ref: 'Film' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Review', ReviewSchema)

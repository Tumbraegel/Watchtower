const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    rating: Number,
    reviewCriteria: Array,
    author: String, //{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    film: String,
}, {timestamps: true});

module.exports = mongoose.model('Review', ReviewSchema);
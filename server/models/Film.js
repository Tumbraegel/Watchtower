const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema({
    title: String,
    year: String,
    released: String, 
    rated: String,
    runtime: String,
    genres: String,
    directors: String,
    writers: String,
    actors: String,
    plot: String,
    language: {type: String, lowercase: true}, 
    country: String, 
    awards: String,
    poster: String,
    imdbID: {type: String, unique: true},
    overallRating: Number,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('Film', FilmSchema);
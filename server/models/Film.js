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
    language: String, 
    country: String, 
    awards: String,
    poster: String,
    imdbID: {type: String, unique: true},
    overallRating: Array,
    // change reviews to [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('Film', FilmSchema);
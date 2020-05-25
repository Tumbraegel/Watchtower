const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilmSchema = new Schema({
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
    diversityIndicator: Number,
    queerFriendlinessIndicator: Number,
    genderEqualityIndicator: Number
});

module.exports = mongoose.model('Film', FilmSchema);;
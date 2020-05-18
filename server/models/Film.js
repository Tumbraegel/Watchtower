const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilmSchema = new Schema({
    title: String,
    genres: String,
    description: String,
    releaseDate: String,
    duration: String,
    cast: String,
    image: String
});

module.exports = mongoose.model('Film', FilmSchema);;
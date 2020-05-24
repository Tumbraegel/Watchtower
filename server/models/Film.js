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
    imdbID: String,
    diversityIndicator: Number,
    queerFriendlinessIndicator: Number,
    genderEqualityIndicator: Number
});

/*
RAPID API RESULTS
title, year, rated, released, runtime
genre, director, writer, actors, plot
language, country, awards, poster

ratings from rotten tomatoes, internet movie db, metacritic
metascore, imdb rating, imdb votes
*/
module.exports = mongoose.model('Film', FilmSchema);;
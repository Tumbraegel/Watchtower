const express = require('express');
const router = express.Router();
const auth = require('../config/auth_config');
const filmRepo = require('../repositories/FilmRepository');
const reviewRepo = require('../repositories/ReviewRepository');
const User = require('../models/User');

// GET all films
router.get('/', (req, res) => {
    filmRepo.findAll().then((films) => {
        res.json(films);
    }).catch((error) => console.log(error));
});

// GET one film
router.get('/film/:id', (req, res) => {
    const id = Object(req.params.id);
    //filmRepo.calculateScore(id);
    filmRepo.findFilmByImdbID(id).then((film) => {
        res.json(film);
    }).catch((error) => console.log("Errors " + error));
});

// POST film review
router.post('/film/:id', auth, async (req, res) => {
    const id = req.params.id;
    reviewRepo.create(id, req.body, req.user).then((review) => {
        res.json(review);
    }).catch((error) => console.log(error));
});

// GET films filtered by genre
router.get('/genre/:genre', (req, res) => {
    const genre = Object(req.params.genre);
    filmRepo.findByGenre(genre).then((films) => {
        res.json(films);
    }).catch((error) => console.log(error));
});

module.exports = router;
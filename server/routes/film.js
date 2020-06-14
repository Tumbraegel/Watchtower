const express = require('express');
const router = express.Router();
const filmRepo = require('../repositories/FilmRepository');
const reviewRepo = require('../repositories/ReviewRepository');

// GET all films
router.get('/', (req, res) => {
    filmRepo.findAll().then((films) => {
        res.json(films);
    }).catch((error) => console.log(error));
});

// GET one film
router.get('/film/:id', (req, res) => {
    const id = Object(req.params.id);
    filmRepo.findByImdbID(id).then((film) => {
        res.json(film);
    }).catch((error) => console.log(error));
});

// POST film review
router.post('/film/:id', (req, res) => {
    const id = req.params.id;
    reviewRepo.create(id, req.body).then((review) => {
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
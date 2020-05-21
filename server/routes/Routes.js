const express = require('express');

const router = express.Router();
const repo = require('../repositories/FilmRepository');

// GET all films
router.get('/', (req, res) => {
    repo.findAll().then((films) => {
        res.json(films);
    }).catch((error) => console.log(error));
});

// GET one film
router.get('/film/:id', (req, res) => {
    const id = Object(req.params.id);
    repo.findById(id).then((film) => {
        res.json(film);
    }).catch((error) => console.log(error));
});

// GET films filtered by genre
router.get('/genre/:genre', (req, res) => {
    const genre = Object(req.params.genre);
    repo.findByGenre(genre).then((films) => {
        res.json(films);
    }).catch((error) => console.log(error));
});

module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../config/auth_config');
const filmRepo = require('../repositories/FilmRepository');
const reviewRepo = require('../repositories/ReviewRepository');
const commentRepo = require('../repositories/CommentRepository');
const User = require('../models/User');

// GET all films
router.get('/', (req, res) => {
    filmRepo.findAll().then((films) => {
        res.json(films);
    }).catch((error) => console.log(error));
});

// GET one film
router.get('/film/:id', async (req, res) => {
    const id = Object(req.params.id);
    const commentList = await commentRepo.getAllCommentsPer(id);
    filmRepo.findFilmByImdbID(id).then(film => {
        film.push({comments: commentList});
        res.json(film);
    }).catch((error) => console.log("Errors " + error));
});

router.get('/genre', (req, res) => {
    filmRepo.getAllGenres().then(genres => {
        res.json(genres);
    }).catch((error) => console.log(error));
});

// GET films filtered by genre
router.get('/genre/:genre', (req, res) => {
    const genre = Object(req.params.genre);
    filmRepo.findByGenre(genre).then(films => {
        res.json(films);
    }).catch((error) => console.log(error));
});

// GET search result
router.get('/search/:query', async (req, res) => {
    const query = req.params.query;
    filmRepo.findByUserSearch(query).then(films => {
        res.json(films);
    }).catch((error) => console.log(error));
});

// GET info for advanced search
router.get('/advanced-search/:query', async (req, res) => {
    const query = req.params.query;
    filmRepo.findByAdvancedUserSearch(query).then(films => {
        res.json(films);
    }).catch((error) => console.log(error));
});

// POST film review
router.post('/film/:id', auth, async (req, res) => {
    const id = req.params.id;
    reviewRepo.create(id, req.body, req.user).then(review => {
        res.json(review);
    }).catch((error) => console.log(error));
});

// POST film comment
router.post('/film/:id/comment', auth, async (req, res) => {
    const id = req.params.id;
    commentRepo.addComment(id, req.body, req.user).then(comment => {
        res.json(comment);
    }).catch((error) => console.log(error));
});

// POST vote for specific comment
router.post('/film/:id/comment/vote', auth, async (req, res) => {
    commentRepo.addVote(req.body, req.user).then(vote => {
        res.json(vote);
    }).catch((error) => console.log(error));
});

module.exports = router;
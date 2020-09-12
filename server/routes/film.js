const express = require('express')
const router = express.Router()
const auth = require('../config/auth_config')
const filmRepo = require('../repositories/FilmRepository')
const reviewRepo = require('../repositories/ReviewRepository')
const commentRepo = require('../repositories/CommentRepository')
const criterionRepo = require('../repositories/CriterionRepository')
const filmAPI = require('../imdb_data/film_api')

/* HELPER METHODS */
async function getFilmById(id) {
  return await filmRepo.findByImdbID(id)
}

async function getAllReviewCriteria() {
  return await criterionRepo.getAllReviewCriteria()
}

async function getAllReviewCriteriaData() {
  return await criterionRepo.findAll()
}

async function getAllGenres() {
  return await filmRepo.getAllGenres()
}

async function getAllCommentsPer(id) {
  return await commentRepo.getAllCommentsPer(id)
}

async function getReviewDataOfOneFilm(id) {
  let reviews = []
  try {
    const film = await getFilmById(id)
    reviews = await reviewRepo.getReviewDataOfOneFilm(film._id)
  } catch (error) {
    return next(error)
  }
  return reviews
}

async function getAvailableDataForFilmPage(id) {
  const data = {
    comments: [],
    reviews: [],
    reviewCriteria: [],
    reviewCriteriaAndTest: [],
  }
  try {
    data.comments = await getAllCommentsPer(id)
    data.reviews = await getReviewDataOfOneFilm(id)
    data.reviewCriteria = await getAllReviewCriteria()
    data.allReviewCriteriaData = await getAllReviewCriteriaData()
    return data
  } catch (error) {
    return next(error)
  }
}

/* ROUTES */ 

// Retrieve all films
router.get('/', (req, res) => {
    filmRepo.findAll().then((films) => {
        res.json(films)
    }).catch(error => console.log(error))
})

// Retrieve statistical data for films
router.get('/statistics', async (req, res) => {
    const listOfReviewCriteria = await getAllReviewCriteria()
    const allReviewCriteriaData = await getAllReviewCriteriaData()
    const listOfGenres = await getAllGenres()
    filmRepo.getInitialStatistics(listOfReviewCriteria).then((films) => {
        films.reviewCriteria = listOfReviewCriteria
        films.genreList = listOfGenres
        films.reviewCriteriaData = allReviewCriteriaData
        res.json(films)
    }).catch(error => console.log(error))
})

// Retrieve one film
router.get('/film/:id', async (req, res) => {
    const id = Object(req.params.id)
    const data = await getAvailableDataForFilmPage(id)
    filmRepo.findFilmByImdbID(id).then(film => {
        film.push({comments: data.comments})
        film.push({reviews: data.reviews})
        film.push({listOfReviewCriteria: data.reviewCriteria})
        film.push({allReviewCriteriaData: data.allReviewCriteriaData})
        res.json(film)
    }).catch(error => console.log("Errors " + error))
})

// Retrieve all comments for one film
router.get('/film/:id/comments', (req, res) => {
    const id = req.params.id
    commentRepo.getAllCommentsPer(id).then(comments => {
        res.json(comments)
    }).catch(error => console.log("Errors " + error))
})

// Retrieve all existing genres
router.get('/genre', (req, res) => {
    filmRepo.getAllGenres().then(genres => {
        res.json(genres)
    }).catch(error => console.log(error))
})

// Retrieve films filtered by genre
router.get('/genre/:genre', (req, res) => {
    const genre = Object(req.params.genre)
    filmRepo.findByGenre(genre).then(films => {
        res.json(films)
    }).catch(error => console.log(error))
})

// Retrieve search result
router.get('/search/:query', (req, res) => {
    const query = Object(req.params.query)
    filmRepo.findByUserSearch(query).then(films => {
        res.json(films)
    }).catch(error => console.log(error))
})

// Create new film
router.post('/add-film/:id', auth, async (req, res) => {
    const id = req.params.id
    await filmAPI.requestFilmDataFor(id).then(film => {
        res.json(film)
    }).catch(error => console.log(error))
})

// Process query for advanced search
router.post('/advanced-search', (req, res) => {
    filmRepo.findByUserSearch(req.body).then(films => {
        res.json(films)
    }).catch(error => console.log(error))
})

// Create film review
router.post('/film/review/:id', auth, async (req, res) => {
    const id = req.params.id
    const film = await getFilmById(id)
    reviewRepo.createReview(film, req.body, req.user).then(review => {
        res.json(review)
    }).catch(error => console.log(error))
})

// Create film comment
router.post('/film/:id/comment', auth, async (req, res) => {
    const id = req.params.id
    const film = await getFilmById(id)
    commentRepo.addComment(film, req.body, req.user).then(() => {
        res.json(req.body)
    }).catch(error => console.log(error))
})

// Add vote for specific comment
router.post('/film/:id/comment/vote', auth, async (req, res) => {
    commentRepo.addVote(req.body, req.user).then(() => {
        res.json(req.body)
    }).catch(error => console.log(error))
})

// Remove a comment
router.delete("/film/comment/:id", auth, async (req, res) => {
  const id = req.params.id
  commentRepo.deleteComment(id).then(() => {
      res.json(req.body)
    }).catch((error) => console.log(error))
})

router.get('/film/sorted-list', async (req, res) => {
    reviewRepo.quickSort().then(response => {
        res.json(response)
    }).catch(error => console.log(error))
})

module.exports = router
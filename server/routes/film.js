const express = require('express')
const router = express.Router()
const auth = require('../config/auth_config')
const filmRepo = require('../repositories/FilmRepository')
const reviewRepo = require('../repositories/ReviewRepository')
const commentRepo = require('../repositories/CommentRepository')
const criterionRepo = require('../repositories/CriterionRepository')
const searchRepo = require('../repositories/SearchRepository')
const chartFetcher = require('../Charts/chart_fetcher')

/* HELPER METHODS */
async function getRandomSelectionOfFilms() {
  return await filmRepo.getThreeRandomReviewedFilms()
}
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

async function getAllCommentsPer(film) {
  return await commentRepo.getAllCommentsPer(film)
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

async function getFilmPageChartData(id) {
  const reviews = await getReviewDataOfOneFilm(id)
  const reviewCriteria = await getAllReviewCriteria()
  const chartData = await chartFetcher.getFilmPageChartData(reviews, reviewCriteria)
  return chartData
}

async function getAvailableDataForFilmPage(id) {
  const film = await getFilmById(id)
  const data = {
    comments: [],
    charts: {}
  }
  
  const chartData = await getFilmPageChartData(id)
  const commentData = await getAllCommentsPer(film)

  try {
    data.comments = commentData
    data.charts = chartData
    return data
  } catch (error) {
    return null
  }
}

/* ROUTES */ 

// retrieve random reviewed films
router.get('/', (req, res) => {
    getRandomSelectionOfFilms().then((films) => {
        res.json(films)
    }).catch(error => {
      console.log(error.message)
      res.status(500).send('Error in retrieving films.')
    })
})

// retrieve one film
router.get('/film/:id', async (req, res) => {
  const id = Object(req.params.id)
  const data = await getAvailableDataForFilmPage(id)
  filmRepo.findFilmByImdbID(id).then(film => {
    const context = {
      film: film[0],
      comments: data.comments,
      charts: data.charts
    }
    res.json(context)
  }).catch(error => {
    console.log(error.message)
    res.status(500).send('Error in retrieving film data.')
  })
})

// retrieve statistical data for films
router.get('/statistics/:type/:value/:status', (req, res) => {
  const type = req.params.type
  const value = req.params.value
  const status = req.params.status
  chartFetcher.fetchChart(type, value, status).then((films) => {
      res.json(films)
  }).catch(error => {
    console.log(error.message)
    res.status(500).send('Error in retrieving chart data.')
  })
})

// retrieve all existing genres
router.get('/genre', async (req, res) => {
  await filmRepo.addTestData()
    getAllGenres().then(genres => {
        res.json(genres)
    }).catch(error => {
      console.log(error.message)
      res.status(500).send('Error in retrieving chart data.')
    })
})

// retrieve films filtered by genre
router.get('/genre/:genre', (req, res) => {
    const genre = Object(req.params.genre)
    filmRepo.findByGenre(genre).then(films => {
        res.json(films)
    }).catch(error => {
      console.log(error.message)
      res.status(500).send('Error in retrieving genre data.')
    })
})

// retrieve all review criteria data
router.get('/review-criteria', async (req, res) => {
  const reviewCriteria = await getAllReviewCriteria()
  getAllReviewCriteriaData().then(criteria => {
    const context = {criteriaData: criteria, listOfReviewCriteria: reviewCriteria}
    res.json(context)
  }).catch(error => {
    console.log(error.message)
    res.status(500).send('Error in retrieving review criteria.')
  })
})

// retrieve search result
router.get('/search/:query', (req, res) => {
    const query = Object(req.params.query)
    searchRepo.findByUserSearch(query).then(films => {
        res.json(films)
    }).catch(error => {
      console.log(error.message)
      res.status(500).send('Error in retrieving data for search query.')
    })
})

// process query for advanced search
router.post('/advanced-search', (req, res) => {
    searchRepo.findByUserSearch(req.body).then(films => {
        res.json(films)
    }).catch(error => {
      console.log(error.message)
      res.status(500).send('Error in retrieving data for search query.')
    })
})

// create film review
router.post('/film/:id/review', auth, async (req, res) => {
    const id = req.params.id
    const film = await getFilmById(id)
    reviewRepo.createReview(film, req.body, req.user).then(response => {
        res.json(response)
    }).catch(error => {
      console.log(error.message)
      res.status(500).send('Error in saving.')
    })
})

// create film comment
router.post('/film/:id/comment', auth, async (req, res) => {
    const id = req.params.id
    const film = await getFilmById(id)
    commentRepo.addComment(film, req.body, req.user).then(response => {
        res.json(response)
    }).catch(error => {
      console.log(error.message)
      res.status(500).send('Error in saving.')
    })
})

// add vote for specific comment
router.post('/film/:id/comment/vote', auth, async (req, res) => {
    const filmId = req.params.id
    const film = await getFilmById(filmId)
    commentRepo.addVote(film._id, req.body, req.user).then(response => {
        res.json(response)
    }).catch(error => {
      console.log(error.message)
      res.status(500).send('Error in saving.')
    })
})

// remove a comment
router.delete("/film/:id/comment/:commentId", auth, async (req, res) => {
  const filmId = req.params.id
  const commentId = req.params.commentId
  const film = await getFilmById(filmId)
  commentRepo.deleteComment(film._id, commentId).then(response => {
      res.json(response)
    }).catch(error => {
      console.log(error.message)
      res.status(500).send('Error in removal process.')
    })
})

module.exports = router
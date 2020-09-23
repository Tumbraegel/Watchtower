const express = require('express')
const router = express.Router()
const auth = require('../config/auth_config')
const filmRepo = require('../repositories/FilmRepository')
const reviewRepo = require('../repositories/ReviewRepository')
const commentRepo = require('../repositories/CommentRepository')
const criterionRepo = require('../repositories/CriterionRepository')
const searchRepo = require('../repositories/SearchRepository')
const filmAPI = require('../imdb_data/film_api')
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

async function getFilmPageChartData(id) {
  const reviews = await getReviewDataOfOneFilm(id)
  const reviewCriteria = await getAllReviewCriteria()
  const chartData = await chartFetcher.getFilmPageChartData(reviews, reviewCriteria)
  return chartData
}

async function getAvailableDataForFilmPage(id) {
  const data = {
    comments: [],
    reviews: [],
    reviewCriteria: [],
    reviewCriteriaAndTest: [],
    charts: {}
  }
  
  const chartData = await getFilmPageChartData(id) 

  try {
    data.comments = await getAllCommentsPer(id)
    data.reviewCriteria = await getAllReviewCriteria()
    data.allReviewCriteriaData = await getAllReviewCriteriaData()
    data.charts = chartData
    return data
  } catch (error) {
    return null
  }
}

/* ROUTES */ 

// Retrieve random reviewed films
router.get('/', (req, res) => {
    getRandomSelectionOfFilms().then((films) => {
        res.json(films)
    }).catch(error => {
      console.log(error.message)
      res.status(500).send('Error in retrieving films.')
    })
})

// Retrieve statistical data for films
router.get('/statistics/:type/:value', async (req, res) => {
  const type = req.params.type
  const value = req.params.value
  chartFetcher.fetchChart(type, value).then((films) => {
      res.json(films)
  }).catch(error => {
    console.log(error.message)
    res.status(500).send('Error in retrieving chart data.')
  })
})

// Retrieve one film
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

// Retrieve all comments for one film
router.get('/film/:id/comments', (req, res) => {
    const id = req.params.id
    commentRepo.getAllCommentsPer(id).then(comments => {
        res.json(comments)
    }).catch(error => {
      console.log(error.message)
      res.status(500).send('Error in retrieving comments.')
    })
})

// Retrieve all existing genres
router.get('/genre', (req, res) => {
    getAllGenres().then(genres => {
        res.json(genres)
    }).catch(error => {
      console.log(error.message)
      res.status(500).send('Error in retrieving chart data.')
    })
})

// Retrieve films filtered by genre
router.get('/genre/:genre', (req, res) => {
    const genre = Object(req.params.genre)
    filmRepo.findByGenre(genre).then(films => {
        res.json(films)
    }).catch(error => {
      console.log(error.message)
      res.status(500).send('Error in retrieving genre data.')
    })
})

// Retrieve all review criteria data
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

// Retrieve search result
router.get('/search/:query', (req, res) => {
    const query = Object(req.params.query)
    searchRepo.findByUserSearch(query).then(films => {
        res.json(films)
    }).catch(error => {
      console.log(error.message)
      res.status(500).send('Error in retrieving data for search query.')
    })
})

// Create new film
router.post('/add-film/:id', auth, async (req, res) => {
    const id = req.params.id
    await filmAPI.requestFilmDataFor(id).then(film => {
        res.json(film)
    }).catch(error => {
      console.log(error.message)
      res.status(500).send('Error in saving film.')
    })
})

// Process query for advanced search
router.post('/advanced-search', (req, res) => {
    searchRepo.findByUserSearch(req.body).then(films => {
        res.json(films)
    }).catch(error => {
      console.log(error.message)
      res.status(500).send('Error in retrieving data for search query.')
    })
})

// Create film review
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

// Create film comment
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

// Add vote for specific comment
router.post('/film/:id/comment/vote', auth, async (req, res) => {
    const filmId = req.params.id
    commentRepo.addVote(filmId, req.body, req.user).then(response => {
        res.json(response)
    }).catch(error => {
      console.log(error.message)
      res.status(500).send('Error in saving.')
    })
})

// Remove a comment
router.delete("/film/:id/comment/:commentId", auth, async (req, res) => {
  const filmId = req.params.id
  const commentId = req.params.commentId
  commentRepo.deleteComment(filmId, commentId).then(response => {
      res.json(response)
    }).catch(error => {
      console.log(error.message)
      res.status(500).send('Error in removal process.')
    })
})

router.get('/film/sorted-list', async (req, res) => {
    reviewRepo.quickSort().then(response => {
        res.json(response)
    }).catch(error => console.log(error))
})

module.exports = router
const Film = require('../models/Film')
const reviewRepo = require('../repositories/ReviewRepository')
const commentRepo = require('../repositories/CommentRepository')
const userRepo = require('../repositories/UserRepository')
const criterionRepo = require('../repositories/CriterionRepository')

class FilmRepository {
  constructor(model) {
    this.model = model
  }

  // Retrieve all films
  findAll() {
    return this.model.find()
  }

  // Retrieve film by IMDb ID
  findByImdbID(id) {
    return this.model.findOne({ imdbID: id })
  }

  findFilmByImdbID(id) {
    return this.model.find({ imdbID: id })
  }

  // Retrieve film by specific genre
  findByGenre(genre) {
    return this.model.find({ genres: genre })
  }

  // Retrieve all films that have been reviewed at least once
  findAllReviewedFilms() {
    return this.model.find({
      reviews: { $exists: true, $not: { $size: 0 } },
    })
  }

  async getThreeRandomReviewedFilms() {
    const films = await this.findAllReviewedFilms()
    const featuredFilms = []

    for (var i = 0; i < 3; i++) {
      const film = films[Math.floor(Math.random() * films.length)]
      if (featuredFilms.includes(film)) i -= 1
      else featuredFilms.push(film)
    }
    return featuredFilms
  }

  async getInitialStatistics(reviewCriteria) {
    const results = {}
    let listOfFilms = []

    await this.filterForFilmsWithReviewCriterion(reviewCriteria).then(
      (response) => {
        listOfFilms = response
        results.films = listOfFilms
      }
    )
    return results
  }

  async filterForFilmsWithReviewCriterion(criterion) {
    let matches = []

    await this.model
      .find()
      .populate({
        path: 'reviews',
        match: {
          reviewCriteria: { $elemMatch: { name: criterion } },
        },
      })
      .then((films) => {
        for (const film of films) {
          if (film.reviews.length) {
            const reviewData = []
            for (const review of film.reviews) {
              reviewData.push(review.reviewCriteria)
            }
            matches.push({
              title: film.title,
              year: film.year,
              genre: film.genres,
              score: film.overallRating,
              criteria: reviewData,
            })
          }
        }
      })
    return matches
  }

  async getAllGenres() {
    const genreList = []

    await this.model.distinct('genres').then(result => {
      for(const entry of result) {
        const genres = entry.split(', ')
        for (const genre of genres) {
          if(genre != 'N/A') {
            if (!genreList.includes(genre)) {
              genreList.push(genre)
            }
          }
        }
      }
    })

    return genreList
  }

  async getAllReleaseYears() {
    let releaseYears = []

    await this.model.distinct('year').then(result => {
      releaseYears = result
    })

    return releaseYears
  }

  // Add reference to respective reviews
  async addReview(id, review) {
    const film = await this.model.findOne({ imdbID: id })
    film.reviews.push(review._id)
    film.save()
  }

  // Get film data from IMDb api and store in db
  async createEntry(film) {
    const entry = {
      title: film.Title,
      year: film.Year,
      released: film.Released,
      rated: film.Rated,
      runtime: film.Runtime,
      genres: film.Genre,
      directors: film.Director,
      writers: film.Writers,
      actors: film.Actors,
      plot: film.Plot,
      language: film.Language,
      country: film.Country,
      awards: film.Awards,
      poster: film.Poster,
      imdbID: film.imdbID,
      overallRating: 0
    }
    const newFilm = await new this.model(entry)
    return await newFilm
      .save()
      .then(() => {
        "'" + film.Title + "'" + '  successfully stored in database.'
      })
      .catch((error) => console.log(error))
  }

  async calculateHighestRatedFilms(criterion) {
    const data = await this.getDataOfFilmsWithSelectedCriterion(criterion)
    const orderedList = data.sort(this.compareObjects)
    return orderedList.slice(0,20)
  }
  
  async getDataOfFilmsWithSelectedCriterion(selectedValue) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    const data = []
    const reducer = (accumulator, currentValue) => accumulator + currentValue

    await this.findAllReviewedFilms().populate("reviews").then(async results => {
      for(const film of results) {
        const criterionRatings = []
        let collectedInfo = {}
        let result = []
        let endResult = 0

        for(const review of film.reviews) {
          for(const criterion of review.reviewCriteria) {
              if(criterion.name == selectedValue) {
                criterionRatings.push(criterion.result)
                collectedInfo['title'] = film.title
                collectedInfo['imdbID'] = film.imdbID
                collectedInfo['criterionRatings'] = criterionRatings
              }
            }
        }
        if(collectedInfo.criterionRatings != undefined) {
          result = collectedInfo.criterionRatings.map(function (x) { 
            return parseFloat(x)
          })
          endResult = result.reduce(reducer)
          data.push({result: endResult, title: collectedInfo.title, imdbID: collectedInfo.imdbID, ratings: collectedInfo.criterionRatings})
        }
      } 
    })
    return data
  }

   compareObjects(object1, object2) {
    // https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
    let result = 0
    if (object1.result > object2.result) {
      result = 1
    } else if (object1.result < object2.result) {
      result = -1
    }
    return result * -1
  }
}

module.exports = new FilmRepository(Film)

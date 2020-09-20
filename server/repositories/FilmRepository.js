const Film = require('../models/Film')

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

    await this.filterForFilmsWithReviewCriteria(reviewCriteria).then(
      (response) => {
        listOfFilms = response
        results.films = listOfFilms
      }
    )
    return results
  }

  async filterForFilmsWithReviewCriteria(criteriaList) {
    let matches = []

    await this.model
      .find()
      .populate({
        path: 'reviews',
        match: {
          reviewCriteria: { $elemMatch: { name: { $in: criteriaList } } },
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
    const allFilms = await this.findAll()

    for (let entry of allFilms) {
      if (entry.genres) {
        const genres = entry.genres.split(', ')
        for (const genre of genres) {
          if (!genreList.includes(genre)) {
            genreList.push(genre)
          }
        }
      }
    }
    return genreList
  }

  

  // Add reference to respective reviews
  async addReview(id, review) {
    // MISSING error handling on save
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
      otherRatings: film.Ratings,
      metascore: film.Metascore,
      imdbRating: film.imdbRating,
    }
    const newFilm = await new this.model(entry)
    return await newFilm
      .save()
      .then(function (err, res) {
        if (err) {
          console.log("'" + film.Title + "'" + ' already exists in database.')
        } else {
          console.log(
            "'" + film.Title + "'" + '  successfully stored in database.'
          )
        }
      })
      .catch((error) => console.log(error))
  }
}

module.exports = new FilmRepository(Film)

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

  async addTestData() {
    const comments = ['And suddenly I felt fear, for no reason, I could feel it with my backbone, this was an awful experience.',
    'Guys do you think that world which is present in WoW is absolutely amazing?',
    'Which superstitions do you believe guys? In my case, it is related to salt, like if you will drop salt it can cause bad luck.',
    'I want to know what this is, curiosity is just killing me.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    'I loved this movie!',
    'Great film, would definitely recommend!',
    'This film was way too slow for my liking ...',
    'Try again, please!',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia',
    'Aenean pharetra magna ac placerat.',
    'Sit amet cursus sit amet dictum sit.',
    'Placerat orci nulla pellentesque dignissim enim sit amet.',
    'Massa vitae tortor condimentum lacinia quis vel eros.',
    'Pretium fusce id velit ut tortor pretium viverra suspendisse.',
    'Sit amet risus nullam eget.',
    'Nunc pulvinar sapien et ligula',
    'At volutpat diam ut venenatis tellus in metus.',
    'Vitae et leo duis ut diam quam nulla.',
    'Auctor urna nunc id cursus metus aliquam eleifend mi in.',
    'Arcu dui vivamus arcu felis bibendum ut tristique et egestas.',
    'Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est.',
    'Pellentesque massa placerat duis ultricies lacus.',
    'Id consectetur purus ut faucibus pulvinar. ',
    'Sit amet nisl purus in mollis. ',
    'Sagittis eu volutpat odio facilisis.',
    'Velit aliquet sagittis id consectetur purus ut faucibus pulvinar.',
    'Integer enim neque volutpat ac. Sed cras ornare arcu dui vivamus arcu felis. ',
    'Tortor dignissim convallis aenean et tortor at.',
    'Mauris ultrices eros in cursus turpis massa tincidunt dui. ',
    'Scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis.',
    'Tellus in metus vulputate eu scelerisque.',
    'Nisl purus in mollis nunc']
    // const allRatings = [1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10]
    // const allReviewCriteria = await criterionRepo.getAllReviewCriteria()
    // const films = await this.findAll()
    // const users = await userRepo.findAll()

    // for (var i = 0; i < 10; i++) {
    //   const randomFilm = films[Math.floor(Math.random() * films.length)]
    //   const randomUser =  users[Math.floor(Math.random() * users.length)]
      
    //   /* RANDOM REVIEW */
    //   const reviewObject = {name: null, result: 0, testResult: {0: null, 1: null, 2: null, testPassed: null}}
    //   //const randomCriterion = allReviewCriteria[Math.floor(Math.random() * allReviewCriteria.length)]
    //   const randomRating = allRatings[Math.floor(Math.random() * allRatings.length)]
    //   reviewObject.name = 'Queer Friendliness'
    //   reviewObject.result = randomRating
    //   reviewObject.testResult[0] = Math.random() >= 0.3;
    //   reviewObject.testResult[1] = Math.random() >= 0.3;
    //   reviewObject.testResult[2] = Math.random() >= 0.3;
    //   if(reviewObject.testResult[0] == true && reviewObject.testResult[1] == true && reviewObject.testResult[2] == true) {
    //     reviewObject.testResult.testPassed = true
    //   } else {reviewObject.testResult.testPassed = false}
      
    //   const reviewObject2 = {name: null, result: 0, testResult: {0: null, 1: null, 2: null, testPassed: null}}
    //   //const randomCriterion = allReviewCriteria[Math.floor(Math.random() * allReviewCriteria.length)]
    //   reviewObject2.name = 'Diversity'
    //   reviewObject2.result = randomRating
    //   reviewObject2.testResult[0] = Math.random() >= 0.3;
    //   reviewObject2.testResult[1] = Math.random() >= 0.3;
    //   reviewObject2.testResult[2] = Math.random() >= 0.3;
    //   if(reviewObject2.testResult[0] == true && reviewObject2.testResult[1] == true && reviewObject2.testResult[2] == true) {
    //     reviewObject2.testResult.testPassed = true
    //   } else {reviewObject2.testResult.testPassed = false}

    //   const reviewObject3 = {name: null, result: 0, testResult: {0: null, 1: null, 2: null, testPassed: null}}
    //   //const randomCriterion = allReviewCriteria[Math.floor(Math.random() * allReviewCriteria.length)]
    //   reviewObject3.name = 'Diversity'
    //   reviewObject3.result = randomRating
    //   reviewObject3.testResult[0] = Math.random() >= 0.3;
    //   reviewObject3.testResult[1] = Math.random() >= 0.3;
    //   reviewObject3.testResult[2] = Math.random() >= 0.3;
    //   if(reviewObject3.testResult[0] == true && reviewObject3.testResult[1] == true && reviewObject3.testResult[2] == true) {
    //     reviewObject3.testResult.testPassed = true
    //   } else {reviewObject3.testResult.testPassed = false}
    //   /*------------------- */

    //   const randomReviewCriteria = []
    //   randomReviewCriteria.push(reviewObject)
    //   randomReviewCriteria.push(reviewObject2)
    //   randomReviewCriteria.push(reviewObject3)
    //   const data = {reviewCriteria: randomReviewCriteria, rating: randomRating}
    //   console.log('Film: ' + randomFilm.title)
    //   console.log('User ' + randomUser.username)
    //   console.log('Review Criteria ' + randomReviewCriteria)
    //   console.log('Rating: ' + randomRating)
    //   console.log('Combined Data ' + data)
    //   await reviewRepo.createReview(randomFilm, data, randomUser)
      //
      //const randomComment = comments[Math.floor(Math.random() * comments.length)]
      //console.log(randomComment)
      // const randomReview
    //   // 
    // }

    /*Random Comments */
    // for (var i = 0; i < 100; i++) {
    //   const randomFilm = films[Math.floor(Math.random() * films.length)]
    //   const randomUser =  users[Math.floor(Math.random() * users.length)]
    //   const randomComment = comments[Math.floor(Math.random() * comments.length)]
    //   const data = {body: randomComment}
    //   commentRepo.addComment(randomFilm, data, randomUser)
    // }
  }
}

module.exports = new FilmRepository(Film)

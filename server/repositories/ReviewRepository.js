const Review = require('../models/Review')
const userRepo = require('../repositories/UserRepository')

class ReviewRepository {
  constructor(model) {
    this.model = model
  }

  // Retrieve all reviews
  findAll() {
    return this.model.find()
  }

  findById(id) {
    return this.model.findById(id)
  }

  async getReviewDataOfOneFilm(id) {
    const ObjectId = require('mongoose').Types.ObjectId
    return await this.model.find({ film: ObjectId(id) })
  }

  async createReview(film, data, userData) {
    const user = await userRepo.findById(userData.id)
    const review = {
      rating: data.rating,
      reviewCriteria: data.reviewCriteria,
      author: user,
      film: film,
    }

    const ObjectId = require('mongoose').Types.ObjectId
    const oldReview = await this.model.findOne({
      film: ObjectId(film._id),
      author: ObjectId(user._id),
    })

    if (!oldReview) {
      let newReview = new this.model(review)
      await newReview
        .save()
        .then(function () {
          console.log('Review was successfully stored in database.')
          user.reviews.push(newReview._id)
          user.save()
          film.reviews.push(newReview._id)
          film.save()
        })
        .catch((error) => console.log(error))
    } else {
      let newReview = oldReview.overwrite(review)
      await newReview
        .save()
        .then(function () {
          console.log('Review was successfully overwritten in database.')
        })
        .catch((error) => console.log(error))
    }
    this.calculateScore(film.imdbID)

    const reviewList = await this.getReviewDataOfOneFilm(film._id)
    return reviewList
  }

  // calculate general score for one film based on median value
  async calculateScore(id) {
    const scoreArray = []
    const filmRepo = require('../repositories/FilmRepository')
    let film = await filmRepo.findByImdbID(id)

    await filmRepo
      .findByImdbID(id)
      .populate('reviews')
      .then((res) => {
        for (const entry of res.reviews) {
          scoreArray.push(entry.rating)
        }
      })
      .catch((error) => console.log(error))

    if (scoreArray.length) {
      const median = this.calculateMedian(scoreArray)
      film.overallRating = median
      film
        .save()
        .then((res) => {
          console.log('Overall film rating was successfully updated.')
        })
        .catch((error) => console.log(error))
      console.log('MEDIAN ' + median)
    }
  }

  calculateMedian(numbers) {
    // https://stackoverflow.com/questions/45309447/calculating-median-javascript
    const sorted = numbers.slice().sort((a, b) => a - b)
    const middle = Math.floor(sorted.length / 2)
    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2
    }
    return sorted[middle]
  }

  quickSort() {
    const list = [
      { name: 'xyz', score: 5 },
      { name: 'abc', score: 10 },
    ]
    console.log(list)
    if (list.length <= 1) {
      return list
    } else {
      const left = []
      const right = []
      const sorted = []
      // last item of list is used as pivot value
      const lastItem = list.pop()
      const pivot = lastItem.score
      console.log(pivot)
      const length = list.length

      for (let i = 0; i < length; i++) {
        if (list[i] <= pivot) {
          left.push(list[i])
        } else {
          right.push(list[i])
        }
      }

      return sorted.concat(quickSort(left), pivot, quickSort(right))
    }
  }
}

module.exports = new ReviewRepository(Review)

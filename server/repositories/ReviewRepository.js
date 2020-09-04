const Review = require('../models/Review')
const filmRepo = require('../repositories/FilmRepository')
const Film = require('../models/Film')
const User = require('../models/User')

class ReviewRepository {
    constructor(model) {
        this.model = model
    }

    findById(id) {
        return this.model.findById(id)
    }

    // Retrieve all films that have been reviewed at least once
    findAllReviewedFilms() {
        return this.model.find({
            reviewCriteria: { $exists: true, $not: { $size: 0 } },
          })
    }

    async getReviewDataOfOneFilm(id) {
        const ObjectId = require('mongoose').Types.ObjectId
        return await this.model.find({film: ObjectId(id)})
    }
    
    async createReview(film, data, userData) {
        const user = await User.findById(userData.id)
        //const film = await filmRepo.findFilmByImdbID(id)
        
        const review = {
            rating: data.rating,
            reviewCriteria: data.reviewCriteria,
            author: user,
            film: film
        };

        const ObjectId = require('mongoose').Types.ObjectId;
        const oldReview = await this.model.findOne({film: ObjectId(film._id), author: ObjectId(user._id)})

        if (!oldReview)
        {
            let newReview = new this.model(review)
            await newReview.save().then(function() {
                console.log("Review was successfully stored in database.")
                user.reviews.push(newReview._id)
                user.save()
                film.reviews.push(newReview._id)
                film.save()
            }).catch((error) => console.log(error))
        }
        else {
            let newReview = oldReview.overwrite(review)
            await newReview.save().then(function() {
                console.log("Review was successfully overwritten in database.")      
            }).catch(error => console.log(error))
        }
        this.calculateScore(film.imdbID)
    }

    // calculate general score for one film based on median value
    async calculateScore(id) {
        const scoreArray = []
        const filmRepo = require("../repositories/FilmRepository")
        let film = await filmRepo.findByImdbID(id)

        await filmRepo.findByImdbID(id).populate("reviews").then(res => {
            for(const entry of res.reviews) {
                scoreArray.push(entry.rating)
            }
        }).catch((error) => console.log(error))
        
        if(scoreArray.length) {
            const median = this.calculateMedian(scoreArray)
            film.overallRating = median
            film.save().then(res => {
                console.log("Overall film rating was successfully updated.")
            }).catch(error => console.log(error))
            console.log("MEDIAN " + median)
        }
    }

    calculateMedian(numbers) {
        //https://stackoverflow.com/questions/45309447/calculating-median-javascript
        const sorted = numbers.slice().sort((a, b) => a - b)
        const middle = Math.floor(sorted.length / 2)
        if (sorted.length % 2 === 0) {
            return (sorted[middle - 1] + sorted[middle]) / 2
        }
        return sorted[middle]
    }
}

module.exports = new ReviewRepository(Review)
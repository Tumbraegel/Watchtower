const Review = require('../models/Review');
const filmRepo = require('../repositories/FilmRepository');
const userRepo = require('../repositories/UserRepository');

class ReviewRepository {
    constructor(model) {
        this.model = model;
    }
    
    create(film, data) {
        const review = {
            rating: data.rating,
            reviewCriteria: data.reviewCriteria,
            // author: '', // USER NEEDS TO BE REFERENCED
            film: film
        };
        // CHECK IF ALREADY EXISTS --> if there is an entry with same user && film
        const newReview = new this.model(review);
        return Promise.resolve(newReview.save(function (err, res) {
            if (err) {
                console.log(res + "Error in saving review.");
            }
            else {
                console.log("Review was successfully stored in database.");
                filmRepo.addReview(film, newReview._id);
            }
        }))
        };
}

module.exports = new ReviewRepository(Review);
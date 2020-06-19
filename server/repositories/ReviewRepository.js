const Review = require('../models/Review');
const filmRepo = require('../repositories/FilmRepository');
const User = require('../models/User');

class ReviewRepository {
    constructor(model) {
        this.model = model;
    }

    getAllReviewsOfOneUser(user) {
        return this.model.find({author: user});
    }
    
    async create(id, data, userData) {
        const user = await User.findById(userData.id);
        const film = await filmRepo.findByImdbID(id);
        const review = {
            rating: data.rating,
            reviewCriteria: data.reviewCriteria,
            author: user,
            film: film
        };

        var ObjectId = require('mongoose').Types.ObjectId; 
        var oldReview = await this.model.findOne({film: ObjectId(film._id), author: ObjectId(user._id)});

        if (!oldReview)
        {
            let newReview = new this.model(review);
            await newReview.save().then(function() {
                console.log("Review was successfully stored in database.");
                user.reviews.push(newReview._id);
                user.save();
                filmRepo.addReview(id, newReview._id);
            }).catch((error) => console.log(error));
        }
        else {
            let newReview = oldReview.overwrite(review);
            await newReview.save().then(function() {
                console.log("Review was successfully overwritten in database.");       
            }).catch(error => console.log(error));
        }
        this.calculateScore(id);
    };

    async calculateScore(id) {
        const scoreArray = [];
        let film = await filmRepo.findByImdbID(id);

        await filmRepo.findByImdbID(id).populate("reviews").then(res => {
            for(const entry of res.reviews) {
                scoreArray.push(entry.rating);
            }
        }).catch((error) => console.log(error));
        
        console.log("Score Array: " + scoreArray);
            const median = this.calculateMedian(scoreArray);
            film.overallRating = median;
            film.save().then(res => {
                console.log("Film rating was successfully updated.");
            }).catch(error => console.log(error));
            console.log("MEDIAN " + median);
    }

    calculateMedian(numbers) {
        //https://stackoverflow.com/questions/45309447/calculating-median-javascript
        const sorted = numbers.slice().sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        if (sorted.length % 2 === 0) {
            return (sorted[middle - 1] + sorted[middle]) / 2;
        }
        return sorted[middle];
    }
}

module.exports = new ReviewRepository(Review);
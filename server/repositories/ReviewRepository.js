const Review = require('../models/Review');
const filmRepo = require('../repositories/FilmRepository');
const User = require('../models/User');
// const userRepo = require('../repositories/UserRepository');

class ReviewRepository {
    constructor(model) {
        this.model = model;
    }

    findByUserAndIMDbID(id, user) {
        return this.model.findOne({ imdbID: id, author: user});
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

        // Override review if user reviewed this particular film before
        // const oldReview = this.findByUserAndIMDbID(id, user._id);
        let newReview = new this.model(review); 

        /*
        if (!oldReview)
        {
            newReview = new this.model(review);
            newReview.save();
            console.log("CREATED") 
        } 
        else {
            newReview = this.model.update(oldReview._id, review);
            console.log("UPDATED")
        }
        */

        // CHECK IF ALREADY EXISTS --> if there is an entry with same user && film
        //const newReview = new this.model(review);
        return Promise.resolve(newReview.save(function (err, res) {
            if (err) {
                console.log(res + "- Error in saving review.");
            }
            else {
                console.log("Review was successfully stored in database.");
                user.reviews.push(newReview._id);
                user.save();
                filmRepo.addReview(id, newReview._id);
            }
        }));
        };
}

module.exports = new ReviewRepository(Review);
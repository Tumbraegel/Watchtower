const Comment = require('../models/Comment');
const filmRepo = require('../repositories/FilmRepository');
const User = require('../models/User');


class CommentRepository {
    constructor(model) {
        this.model = model;
    }

    async getAllCommentsPer(id) {
        const film = await filmRepo.findByImdbID(id);
        const ObjectId = require('mongoose').Types.ObjectId; 
        const commentList = await this.model.find({film: ObjectId(film._id)});
        return commentList;
    }

    async addComment(id, data, userData) {
        const user = await User.findById(userData.id);
        const film = await filmRepo.findByImdbID(id);

        const comment = {
            body: data.body,
            author: user,
            film: film
        };

        const ObjectId = require('mongoose').Types.ObjectId;
        const oldComment = await this.model.findOne({film: ObjectId(film._id), author: ObjectId(user._id)});

        if (!oldComment)
        {
            let newComment = new this.model(comment);
            await newComment.save().then(function() {
                console.log("Comment was successfully stored in database.");
                user.reviews.push(newComment._id);
                user.save();
            }).catch((error) => console.log(error));
        }
        else {
            let newComment = oldComment.overwrite(comment);
            await newComment.save().then(function() {
                console.log("Comment was successfully overwritten in database.");       
            }).catch(error => console.log(error));
        }
    }
}

module.exports = new CommentRepository(Comment);
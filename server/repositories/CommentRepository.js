const Comment = require('../models/Comment');
const filmRepo = require('../repositories/FilmRepository');
const User = require('../models/User');

class CommentRepository {
    constructor(model) {
        this.model = model;
    }

    // Retrieve comment by ObjectId
    findById(id) {
        return this.model.findById(id);
    }

    async getAllCommentsPer(id) {
        const commentList = [];
        const film = await filmRepo.findByImdbID(id);
        const ObjectId = require('mongoose').Types.ObjectId; 
        const comments = await this.model.find({film: ObjectId(film._id)});
        
        // turn mongoose objects into regular objects in order to manipulate content
        for(let comment of comments) {
            commentList.push(comment.toObject());
        }

        for(let comment of commentList) {
            const id = comment.author;
            const user = await User.findById(id);
            comment.username = user.username;
        }

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

    async addVote(data, userData) {
        const user = await User.findById(userData.id);
        const comment = await this.findById(data.comment_id);
        // CHECK IF USER ALREADY VOTED
        if(data.type = 'downvote') {
            comment.downvotes.push(user._id)
            comment.save()
        }
        else {
            comment.upvotes.push(user._id)
            comment.save()
        }
    }
}

module.exports = new CommentRepository(Comment);
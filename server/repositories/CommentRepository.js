const Comment = require('../models/Comment')
const filmRepo = require('../repositories/FilmRepository')
const userRepo = require('../repositories/UserRepository')

class CommentRepository {
  constructor(model) {
    this.model = model
  }

  // Retrieve comment by ObjectId
  findById(id) {
    return this.model.findById(id)
  }

  async getFilmById(id) {
    const film = await filmRepo.findByImdbID(id)
    return film
  }

  async getAllCommentsPer(id) {
    const film = await this.getFilmById(id)
    const ObjectId = require('mongoose').Types.ObjectId
    const comments = await this.model.find({ film: ObjectId(film._id) })
    .populate({
        path: 'author',
        select: "_id username email",
        populate: {
          path: 'user',
          model: 'User',
        }
      }
    )
    return comments
  }

  async addComment(film, data, userData) {
    const user = await userRepo.findById(userData.id)

    const comment = {
      body: data.body,
      author: user,
      film: film,
    }

    const ObjectId = require('mongoose').Types.ObjectId
    let oldComment = ''
    if (data.commentId != '')
      oldComment = await this.model.findOne({ _id: ObjectId(data.commentId) })

    if (data.editStatus == true) {
      let newComment = oldComment.overwrite(comment)
      await newComment
        .save()
        .then(function () {
          console.log('Comment was successfully overwritten in database.')
        })
        .catch((error) => console.log(error))
    } else {
      let newComment = new this.model(comment)
      await newComment
        .save()
        .then(function () {
          console.log('Comment was successfully stored in database.')
          user.reviews.push(newComment._id)
          user.save()
        })
        .catch((error) => console.log(error))
    }

    const commentList = await this.getAllCommentsPer(film.imdbID)
    return commentList
  }

  async addVote(filmId, data, userData) {
    const user = await userRepo.findById(userData.id)
    const comment = await this.findById(data.commentId)

    if (data.vote == 'downvote') {
      comment.downvotes.push(user._id)
      await comment.save()
    } else if (data.vote == 'upvote') {
      comment.upvotes.push(user._id)
      await comment.save()
    }

    const commentList = await this.getAllCommentsPer(filmId)
    return commentList
  }

  async deleteComment(filmId, commentId) {
    await this.model
      .findByIdAndDelete(commentId)
      .then(() => {
        console.log('Comment successfully removed!')
      })
      .catch((error) => console.log(error))

    const commentList = await this.getAllCommentsPer(filmId)
    return commentList
  }
}

module.exports = new CommentRepository(Comment)

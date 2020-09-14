import FilmService from '../src/services/film_service'

export const film = {
    namespaced: true,
    state: {
        filmContext: {},
        reviewList: [],
        commentList: [],
        reviewCriteriaList: [],
        allReviewCriteriaData: [],
        overallRating: 0
    },
  
    actions: {
        async fetchFilmContext({ commit }, id) {
            try {
                await FilmService.getCollectedFilmInfo(id).then(response => {
                    commit('SET_FILM_CONTEXT', response.data)
                    return Promise.resolve(response.data)
                })
            }
            catch (error) {
                console.log("Error in setting film context.")
                return Promise.reject(error)
            }
        },

        async addFilmReview({ commit }, payload) {
            try {
                await FilmService.postFilmReview(payload.filmId, payload).then(response => {
                    commit('ADD_REVIEW', response.data)
                    return Promise.resolve(response.data)
                })
            }
              catch (error) {
                console.log("Error in adding film review.")
                return Promise.reject(error)
              }
        },

        async addComment({ commit }, payload) {
            try {
                await FilmService.postComment(payload.filmId, payload).then(response => {
                    commit('ADD_COMMENT', response.data)
                    return Promise.resolve(response.data)
                })
            }
              catch (error) {
                console.log("Error in adding comment.")
                return Promise.reject(error)
              }
        },

        async voteForComment({ commit }, payload) {
            try {
                await FilmService.postCommentVote(payload.filmId, payload).then(response => {
                    commit('VOTE_FOR_COMMENT', response.data)
                    return Promise.resolve(response.data)
                })
            }
              catch (error) {
                console.log("Error in up or downvoting a comment.")
                return Promise.reject(error)
              }
        },

        async deleteComment({ commit }, payload) {
            try {
                await FilmService.deleteComment(payload.filmId, payload.commentId).then(response => {
                    commit('DELETE_COMMENT', response.data)
                    return Promise.resolve(response.data)
                })
            }
              catch (error) {
                console.log("Error in deleting comment.")
                return Promise.reject(error)
              }
        }
    },

    mutations: {
        SET_FILM_CONTEXT(state, response) {
            state.filmContext = response[0]
            state.commentList = response[1].comments
            state.reviewList = response[2].reviews
            state.reviewCriteriaList = response[3].listOfReviewCriteria
            state.allReviewCriteriaData = response[4].allReviewCriteriaData
            state.overallRating = response[0].overallRating
        },

        ADD_REVIEW(state, response) {
            state.reviewList = response
        },

        ADD_COMMENT(state, response) {
            state.commentList = response
        },

        DELETE_COMMENT(state, response) {
            state.commentList = response
        },

        VOTE_FOR_COMMENT(state, response) {
            state.commentList = response
        }
    },
  }
  
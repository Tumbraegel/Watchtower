import FilmService from '../src/services/film_service'

export const film = {
    namespaced: true,
    state: {
        filmContext: {},
        reviewList: [],
        commentList: [],
        reviewCriteriaList: [],
        allReviewCriteriaData: []
    },

    getters: {
        getReviewData(state) {
            const reviewData = []
            for(const review of state.reviewList) {
                const data = {}
                data['rating'] = review.rating
                data['reviewCriteria'] = review.reviewCriteria
                data['filmId'] = review.film
                reviewData.push(data)
            }
            return reviewData
        }
        // sortedComments(state) {
        //     return state.comments.filter(comment => comment.upvotes)
        // }
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

        async deleteComment({ commit }, id) {
            try {
                await FilmService.deleteComment(id).then(response => {
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
        },

        ADD_COMMENT(state, response) {
            state.commentList.push(response)
        },

        DELETE_COMMENT(state, response) {
            state.commentList = state.commentList.filter(comment => response._id != comment._id)
            console.log(state.commentList)
        }
    },
  }
  
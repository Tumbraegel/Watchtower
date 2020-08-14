//import FilmService from '../src/services/film_service'

export const film = {
    namespaced: true,
    state: {
        film: {},
        reviews: [],
        comments: []
    },

    getters: {
        filmInfo: state => {
            return state.film
        },
        reviews: state => {
            return state.film.reviews
        },
        comments: state => {
            return state.film.comments
        }
    },
  
    actions: {
        fetchFilmContext: ({ commit }, film) => {
            commit('fetchFilm', {film: film})
        },

        fetchReviews: ({ commit }, reviews) => {
            commit('fetchReviews', {reviewList: reviews})
        },

        fetchComments: ({ commit }, comments) => {
            commit('fetchComments', {commentList: comments})
        },
        // async addComment({ commit }, comment, id) {
        //     try {
        //         await FilmService.addComment(comment, id)
        //         commit('addCommentSuccess', comment)
        //         return Promise.resolve(comment)
        //       }
        //       catch (error) {
        //         commit('addCommentFailure')
        //         return Promise.reject(error)
        //       }
        // }
    },
    
    mutations: {
        fetchFilm(state, payload) {
            state.film = payload
        },
        fetchReviews(state, payload) {
            for(const review of payload.reviewList) {
                state.reviews.push(review)
            }
        },
        fetchComments(state, payload) {
            for(const commment of payload.commentList) {
                state.comments.push(commment)
            }
        },
        // addCommentSuccess(state, comment) {

        // }
    },
  };
  
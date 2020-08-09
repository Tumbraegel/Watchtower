export const film = {
    namespaced: true,
    state: {
        film: {},
        reviews: []
    },

    getters: {
        reviews: state => {
            return state.film.reviews;
        }
    },
  
    actions: {
        fetchFilmContext: ({ commit }, film) => {
            commit('fetchFilm', {film: film})
        },

        fetchReviews: ({ commit }, reviews) => {
            commit('fetchReviews', {reviewList: reviews})
        }
    },
    
    mutations: {
        fetchFilm(state, payload) {
            state.film = payload;
        },

        fetchReviews(state, payload) {
            for(const review of payload.reviewList) {
                state.reviews.push(review);
            }
        }
    },
  };
  
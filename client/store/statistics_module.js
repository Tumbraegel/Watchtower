import FilmService from '../src/services/film_service'

export const statistics = {
    namespaced: true,
    state: {
        initialData: [],
        listOfReviewCriteria: [],
        userFilteredFilms: [],
        genres: []
    },
  
    actions: {
        async fetchInitialState({ commit }) {
            try {
                await FilmService.getInitialStatisticalData().then(response => {
                    commit('SET_INITIAL_STATE', response.data)
                    return Promise.resolve(response.data)
                })
            }
            catch (error) {
                console.log("Error in fetching initial state.")
                return Promise.reject(error)
            }
        },

        async fetchReviewCriteria({commit}) {
            try {
                await FilmService.getExistingReviewCriteria().then(response => {
                    commit('SET_REVIEW_CRITERIA', response.data)
                    return Promise.resolve(response.data)
                })
            }
            catch (error) {
                console.log("Error in fetching review criteria.")
                return Promise.reject(error)
            }
        }
    },

    mutations: {
        SET_INITIAL_STATE(state, response) {
            state.initialData = response
        },

        SET_REVIEW_CRITERIA(state, response) {
            for(const entry of response) {
                state.listOfReviewCriteria.push(entry.criterion)
            }
        }
    },
  }
  
import FilmService from '../src/services/film_service'

export const statistics = {
    namespaced: true,
    state: {
        initialData: [],
        userFilteredFilms: []
    },

    getters: {

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
    },

    mutations: {
        SET_INITIAL_STATE(state, response) {
            state.initialData = response
        },
    },
  }
  
import FilmService from '../src/services/film_service'

export const search = {
  namespaced: true,
  state: {
    keyword: '',
    simple: [],
    advanced: []
  },

  actions: {
    async performSimpleSearch({commit}, keyword) {
      try {
        await FilmService.executeSimpleSearch(keyword).then(response => {
          response.searchKeyword = keyword
          commit('PERFORM_SIMPLE_SEARCH', response)
          return Promise.resolve(response.data)
        })
      }
      catch (error) {
          console.log("Error in executing simple search.")
          return Promise.reject(error)
      }
    },

    async performAdvancedSearch({commit}, query) {
        try {
            await FilmService.executeAdvancedSearch(query).then(response => {
              console.log(response)
                commit('PERFORM_ADVANCED_SEARCH', response.data)
                return Promise.resolve(response.data)
            })
        }
        catch (error) {
            console.log("Error in executing advanced search.")
            return Promise.reject(error)
        }
    }
  },
  
  mutations: {
    PERFORM_SIMPLE_SEARCH(state, response) {
      state.keyword = response.searchKeyword
      state.simple = response.data
    },
    PERFORM_ADVANCED_SEARCH(state, response) {
      state.keyword = ''
      state.simple = []
      state.advanced = response
    }
  },
}

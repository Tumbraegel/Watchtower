export const search = {
  namespaced: true,
  state: {
    input: '',
    multiple: []
  },

  actions: {

  },
  
  mutations: {
    searchFor(state, input) {
      state.input = input
    },
    addResultsFromAdvancedSearch(state, film) {
      state.multiple.push(film)
    }
  },

  getters: {
    input: state => state.input,
    multiple: state => state.multiple
  }
};

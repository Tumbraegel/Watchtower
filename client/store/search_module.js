export const search = {
  namespaced: true,
  state: {
    input: ''
  },

  actions: {

  },
  
  mutations: {
    searchFor(state, input) {
      state.input = input
    }
  },

  getters: {
    input: state => state.input
  }
};

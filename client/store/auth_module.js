// https://bezkoder.com/jwt-vue-vuex-authentication/#Define_Vuex_Authentication_module
// LAST ACCESSED: 14/06

import AuthService from '../src/services/auth_service'
const user = JSON.parse(localStorage.getItem('user'))

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const auth = {
  namespaced: true,
  state: initialState,

  actions: {
    async login({ commit }, user) {
      try {
        await AuthService.login(user).then(response => {
          commit('LOGIN_SUCCESS', response)
          return Promise.resolve(user)
        })
      }
      catch (error) {
        commit('LOGIN_FAILURE')
        return Promise.reject(error)
      }
    },

    logout({ commit }) {
      AuthService.logout()
      commit('LOGOUT')
    },

    async register({ commit }, user) {
      try {
        const response = await AuthService.register(user)
        commit('REGISTER_SUCCESS')
        return Promise.resolve(response.data)
      }
      catch (error) {
        commit('REGISTER_FAILURE')
        return Promise.reject(error)
      }
    },

    async deleteAccount({ commit }, user) {
      try {
        const response = await AuthService.delete(user)
        commit('DELETE_ACCOUNT_SUCCESS')
        return Promise.resolve(response)
      }
      catch (error) {
        commit('DELETE_ACCOUNT_FAILURE')
        return Promise.reject(error)
      }
    } 
  },
  
  mutations: {
    LOGIN_SUCCESS(state, response) {
      state.status.loggedIn = true
      state.user = response
    },
    LOGIN_FAILURE(state) {
      state.status.loggedIn = false
      state.user = null
    },
    LOGOUT(state) {
      state.status.loggedIn = false
      state.user = null
    },
    REGISTER_SUCCESS(state) {
      state.status.loggedIn = false
    },
    REGISTER_FAILURE(state) {
      state.status.loggedIn = false
    },
    DELETE_ACCOUNT_SUCCESS(state) {
      state.status.loggedIn = false
      state.user = null
    },
    DELETE_ACCOUNT_FAILURE() {
      console.log('Something went wrong.')
    }
  }
}
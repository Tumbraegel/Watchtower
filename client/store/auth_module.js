// https://bezkoder.com/jwt-vue-vuex-authentication/
// LAST ACCESSED: 14/06
// Authentication module containing states, actions and mutations
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
        await AuthService.login(user)
        commit('loginSuccess', user)
        return Promise.resolve(user)
      }
      catch (error) {
        commit('loginFailure')
        return Promise.reject(error)
      }
    },

    logout({ commit }) {
      AuthService.logout()
      commit('logout')
    },

    async register({ commit }, user) {
      try {
        const response = await AuthService.register(user)
        commit('registerSuccess')
        return Promise.resolve(response.data)
      }
      catch (error) {
        commit('registerFailure')
        return Promise.reject(error)
      }
    }
  },
  
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true
      state.user = user
    },
    loginFailure(state) {
      state.status.loggedIn = false
      state.user = null
    },
    logout(state) {
      state.status.loggedIn = false
      state.user = null
    },
    registerSuccess(state) {
      state.status.loggedIn = false
    },
    registerFailure(state) {
      state.status.loggedIn = false
    }
  }
}
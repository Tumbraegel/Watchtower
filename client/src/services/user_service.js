// https://bezkoder.com/jwt-vue-vuex-authentication/#data_service
// LAST ACCESSED: 14/06
import axios from 'axios'
import authHeader from './auth_header'

const API_URL = 'http://localhost:8000/api/auth'

class UserService {
  getUserProfile() {
    return axios.get(API_URL + '/me', { headers: authHeader() })
  }

  addNewAdminUser(payload) {
    return axios.post(API_URL + '/add-admin', payload, { headers: authHeader() })
  }

  addNewReviewCriterion(payload) {
    return axios.post(API_URL + '/add-criterion', payload, { headers: authHeader() })
  }

  addFilm(id, payload) {
    return axios.post(API_URL + '/add-film/' + id, payload, { headers: authHeader() })
  }
}

export default new UserService();

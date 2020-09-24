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
    return axios.post(API_URL + '/admin/data', payload, { headers: authHeader() })
  }

  addNewReviewCriterion(payload) {
    return axios.post(API_URL + '/admin/data', payload, { headers: authHeader() })
  }

  addFilm(payload) {
    return axios.post(API_URL + '/admin/data', payload, { headers: authHeader() })
  }
}

export default new UserService();

// https://bezkoder.com/jwt-vue-vuex-authentication/
// LAST ACCESSED: 14/06
import axios from 'axios'
import authHeader from './auth_header'

const API_URL = 'http://localhost:8000'

class UserService {
  getUserProfile() {
    return axios.get(API_URL + '/api/auth/me', { headers: authHeader() })
  }

  getAdminSection() {
    return axios.get(API_URL + '/api/auth/admin', { headers: authHeader() })
  }

  postNewAdminUser(payload) {
    return axios.post(API_URL + '/api/auth/add-admin', payload, { headers: authHeader() })
  }
  
  postReview(payload, id) {
    return axios.post(API_URL + '/film/review/' + id, payload, { headers: authHeader() })
  }

  deleteComment(id) {
    return axios.delete(API_URL + '/film/comment/delete/' + id, { headers: authHeader() })
  }

  postComment(payload, id) {
    return axios.post(API_URL + '/film/' + id + '/comment', payload, { headers: authHeader() })
  }

  postCommentVote(payload, id) {
    return axios.post(API_URL + '/film/' + id + '/comment/vote', payload, { headers: authHeader() })
  }

  postNewCriterion(payload) {
    return axios.post(API_URL + '/api/auth/add-criterion', payload, { headers: authHeader() })
  }
}

export default new UserService();

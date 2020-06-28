// https://bezkoder.com/jwt-vue-vuex-authentication/
// LAST ACCESSED: 14/06
import axios from 'axios';
import authHeader from './auth_header';

const API_URL = 'http://localhost:8000';

class UserService {
  getPublicContent() {
    // no auth header needed because resource is not protected
    return axios.get(API_URL + '/api/auth/all');
  }

  getUserProfile() {
    return axios.get(API_URL + '/api/auth/me', { headers: authHeader() });
  }

  getUserBoard() {
    return axios.get(API_URL + '/api/auth/user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + '/api/auth/admin', { headers: authHeader() });
  }
  
  postReview(payload, id) {
    return axios.post(API_URL + '/film/' + id, payload, { headers: authHeader() });
  }

  postComment(payload, id) {
    return axios.post(API_URL + '/film/' + id + '/comment', payload, { headers: authHeader() });
  }
}
export default new UserService();

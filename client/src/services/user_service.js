// https://bezkoder.com/jwt-vue-vuex-authentication/
// LAST ACCESSED: 14/06
import axios from 'axios';
import authHeader from './auth_header';

const API_URL = 'http://localhost:8000/api/auth/';

class UserService {
  getPublicContent() {
    // no auth header needed because resource is not protected
    return axios.get(API_URL + 'all');
  }

  getUserProfile() {
    return axios.get(API_URL + 'me', { headers: authHeader() });
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();

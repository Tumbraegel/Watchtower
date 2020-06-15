// https://bezkoder.com/jwt-vue-vuex-authentication/
// LAST ACCESSED: 14/06
import axios from 'axios';
const API_URL = 'http://localhost:8000/api/auth';

class AuthService {
  async login(user) {
    const response = await axios
      .post(API_URL + '/login', {
        email: user.email,
        password: user.password
      });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios
    .post(API_URL + '/register', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();

import axios from 'axios'
const API_URL = 'http://localhost:8000/'
import authHeader from './auth_header'

class FilmService {
  addComment(payload, id) {
    return axios.post(API_URL + '/film/' + id + '/comment', payload, { headers: authHeader() })
  }
}

export default new FilmService()

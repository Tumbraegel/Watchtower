import axios from 'axios'
const API_URL = 'http://localhost:8000'
import authHeader from './auth_header'

class FilmService {
  getAllComments(filmId) {
    return axios.get(API_URL + '/film/' + filmId + '/comments')
  }

  async getCollectedFilmInfo(filmId) {
    return await axios.get(API_URL + '/film/' + filmId)
  }

  postComment(id, payload) {
    return axios.post(API_URL + '/film/' + id + '/comment', payload, { headers: authHeader() })
  }

  deleteComment(id) {
    return axios.delete(API_URL + '/film/comment/delete/' + id, { headers: authHeader() })
  }
}

export default new FilmService()

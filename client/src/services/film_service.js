import axios from 'axios'
const API_URL = 'http://localhost:8000'
import authHeader from './auth_header'

class FilmService {
  getRandomReviewedFilms() {
    return axios.get(API_URL + '/')
  }

  async getCollectedFilmInfo(filmId) {
    return await axios.get(API_URL + '/film/' + filmId)
  }

  getGenreData() {
    return axios.get(API_URL + '/genre')
  }

  getListOfFilmsPer(genre) {
    return axios.get(API_URL + '/genre/' + genre)
  }

  getAllComments(filmId) {
    return axios.get(API_URL + '/film/' + filmId + '/comments')
  }

  async postFilmReview(id, payload) {
    return await axios.post(API_URL + '/film/' + id + '/review', payload, { headers: authHeader() })
  }

  postComment(id, payload) {
    return axios.post(API_URL + '/film/' + id + '/comment', payload, { headers: authHeader() })
  }

  postCommentVote(id, payload) {
    return axios.post(API_URL + '/film/' + id + '/comment/vote', payload, { headers: authHeader() })
  }

  deleteComment(id, commentId) {
    return axios.delete(API_URL + '/film/' + id + '/comment/' + commentId, { headers: authHeader() })
  }

  executeAdvancedSearch(payload) {
    return axios.post(API_URL + '/advanced-search', payload)
  }

  executeSimpleSearch(keyword) {
    return axios.get(API_URL + '/search/' + keyword)
  }

  getInitialStatisticalData() {
    return axios.get(API_URL + '/statistics')
  }
}

export default new FilmService()

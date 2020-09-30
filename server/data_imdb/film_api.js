// https://rapidapi.com/rapidapi/api/movie-database-imdb-alternative
// The appliaction key can be found in the 
// LAST ACCESSED 25/05
const axios = require("axios")
const filmRepo = require("../repositories/FilmRepository")
const imdbData = require('./imdb_id_list')

class IMDbAPI {
  async requestFilmDataFor(IMDbId) {
    await axios({
      "method":"GET",
      "url":"https://movie-database-imdb-alternative.p.rapidapi.com/",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"movie-database-imdb-alternative.p.rapidapi.com",
      "x-rapidapi-key":"",
      "useQueryString":true
      },"params":{
      "i":IMDbId,
      "r":"json",
      "type":"movie"
      }
      })
      .then(response => {
        this.addFilmToDatabase(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  requestFilms() {
    // get list of IDs from test file
    imdbData.getListOfIDs().then(list => {
      list.forEach(id => {
        this.requestFilmDataFor(id)
      })
    })
  }

  async addFilmToDatabase(data) {
    return await filmRepo.createEntry(data)
  }
}

module.exports = new IMDbAPI()

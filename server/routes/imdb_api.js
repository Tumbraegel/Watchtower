// https://rapidapi.com/rapidapi/api/movie-database-imdb-alternative
// LAST ACCESSED 25/05
const axios = require("axios");
const repo = require("../repositories/FilmRepository");
const imdbData = require('../imdb_data/ID_collection');

class IMDbAPI {
  getFilmInfo(item) {
    axios({
      "method":"GET",
      "url":"https://movie-database-imdb-alternative.p.rapidapi.com/",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"movie-database-imdb-alternative.p.rapidapi.com",
      "x-rapidapi-key":"993e3ceeecmsh49752a202dcc09ap147bf2jsn467fea76b0fd",
      "useQueryString":true
      },"params":{
      "i":item,
      "r":"json",
      "type":"movie"
      }
      })
      .then((res)=>{
        repo.createEntry(res.data);
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  runScript() {
    // processLineByLine returns promise object. the result can be accessed using then()
    imdbData.processLineByLine().then(list => {
      list.forEach((item) => {
        this.getFilmInfo(item);
      });
    })
  }
}

module.exports = new IMDbAPI();

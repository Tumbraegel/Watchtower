// https://rapidapi.com/rapidapi/api/movie-database-imdb-alternative
// LAST ACCESSED 25/05
const axios = require("axios");
const repo = require("../repositories/FilmRepository");
const idList = ["tt3281548", "tt4846340", "tt1392190", "tt5726616", "tt4925292"];

class IMDbData {
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
    idList.forEach((item) => {
      this.getFilmInfo(item);
    });
  }
}

module.exports = new IMDbData();

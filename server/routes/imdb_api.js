// https://rapidapi.com/rapidapi/api/movie-database-imdb-alternative
// LAST ACCESSED 24/05
var unirest = require("unirest");
const repo = require('../repositories/FilmRepository');

var req = unirest("GET", "https://movie-database-imdb-alternative.p.rapidapi.com/");

class IMDbData {
    runScript() {
        req.query({
            "y": "tt1706620",
            "r": "json",
            "type": "movie"
        });
        
        req.headers({
            "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
            "x-rapidapi-key": "993e3ceeecmsh49752a202dcc09ap147bf2jsn467fea76b0fd",
            "useQueryString": true
        });
        
        
        req.end(function (res) {
            if (res.error) throw new Error(res.error);
            repo.createEntry(res.body);
            console.log(res.body);
        });
    }
}

module.exports = new IMDbData();
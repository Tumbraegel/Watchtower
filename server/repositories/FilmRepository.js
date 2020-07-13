const Film = require("../models/Film");

class FilmRepository {
  constructor(model) {
    this.model = model;
  }

  // Retrieve all films
  findAll() {
    return this.model.find();
  }

  // Retrieve all films that have been reviewed at least once
  findAllReviewedFilms() {
    return this.model.find({
      reviewCriteria: { $exists: true, $not: { $size: 0 } },
    });
  }

  // Retrieve film by ObjectId
  findById(id) {
    return this.model.findById(id);
  }

  // Retrieve film by IMDb ID
  findByImdbID(id) {
    return this.model.findOne({ imdbID: id });
  }

  // FIXME: refactor this
  findFilmByImdbID(id) {
    return this.model.find({ imdbID: id });
  }

  // Retrieve film by specific genre
  findByGenre(genre) {
    return this.model.find({ genres: genre });
  }

  async getAllGenres() {
    const genreList = [];
    const allFilms = await this.findAll();
    
    for(let entry of allFilms) {
      const genres = entry.genres.split(', ');
      for (const genre of genres) {
        if(!genreList.includes(genre)) {
          genreList.push(genre)
        }
      }
    }
    return genreList;
  }

  async findByUserSearch(query) {
    const matches = []; 
    const listOfFilms = [];
    await this.findAll().then((result) => {
        listOfFilms.push(result);
      })
      .catch((error) => {
        console.log(error);
      });

    let result = 100;
    for(const entry of listOfFilms[0]) {
        if(entry.title != null){
        const cost = this.calculateLevenstheinDistance(entry.title, query)
        if(cost < result) result = cost;
        if(cost < 7) matches.push(entry);
        }
    }
    // console.log(matches);
    return matches;
  }

  async findByAdvancedUserSearch(query) {
    //FIXME: Refactor search methods
  }

  // Reference: https://www.geeksforgeeks.org/edit-distance-dp-5/
  // Reference: https://www.youtube.com/watch?v=We3YDTzNXEk
  calculateLevenstheinDistance(string1, string2) {
    let matrix = [];

    const length1 = string1.length;
    const length2 = string2.length;

    // if one string is empty, all characters of other string need
    // to be inserted into the first one and vice versa
    if (length1 == 0) return length2;
    if (length2 == 0) return length1;

    // create empty 2D array (matrix) based on input string lengths
    matrix = new Array(length1);

    for (let i = 0; i <= length1; i++) {
      matrix[i] = new Array(length2);
    }

    // add string indices to matrix
    for (let i = 0; i <= length1; i++) matrix[i][0] = i;
    for (let j = 0; j <= length2; j++) matrix[0][j] = j;

    for (let i = 1; i <= length1; i++) {
      for (let j = 1; j <= length2; j++) {

        // if character is the same, take diagonal value
        if (string1.charAt(i - 1) == string2.charAt(j - 1))
          matrix[i][j] = matrix[i - 1][j - 1];

        // if character is different, take minimum of three surrounding values
        // in matrix (left, diagonal, top)
        else
          matrix[i][j] =
            Math.min(matrix[i - 1][j], matrix[i - 1][j - 1], matrix[i][j - 1]) + 1;
      }
    }
    return matrix[length1][length2];
  }

  // Add reference to respective reviews
  async addReview(id, review) {
    // MISSING error handling on save
    const film = await this.model.findOne({ imdbID: id });
    film.reviews.push(review._id);
    film.save();
  }

  // Get film data from IMDb api and store in db
  createEntry(film) {
    const entry = {
      title: film.Title,
      year: film.Year,
      released: film.Released,
      rated: film.Rated,
      runtime: film.Runtime,
      genres: film.Genre,
      directors: film.Director,
      writers: film.Writers,
      actors: film.Actors,
      plot: film.Plot,
      language: film.Language,
      country: film.Country,
      awards: film.Awards,
      poster: film.Poster,
      imdbID: film.imdbID,
    };
    const newFilm = new this.model(entry);
    return newFilm.save().then(function (err, res) {
      if (err) {
        console.log("'" + film.Title + "'" + " already exists in database.");
      } else {
        console.log(
          "'" + film.Title + "'" + "  successfully stored in database."
        );
      }
    });
  }
}

module.exports = new FilmRepository(Film);

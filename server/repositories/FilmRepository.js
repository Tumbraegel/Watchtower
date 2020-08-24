const Film = require("../models/Film");
const reviewRepo = require("../repositories/ReviewRepository");

class FilmRepository {
  constructor(model) {
    this.model = model;
  }

  // Retrieve all films
  findAll() {
    return this.model.find();
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

  async getInitialStatistics() {
    const listOfHighestScores = []
    let listOfAllFilms = []
    await this.findAll().then(response => {
      listOfAllFilms = response
    })
    const criteriaList = ['Diversity', 'Queer Friendliness', 'Gender Equality']

    const results = []
    this.model.find().populate({
      path  : 'reviews',
      match : { reviewCriteria : { $elemMatch: {name: 'Queer Friendliness' }}}
    }).exec(function (err, films) {
      films = films.filter(function(film) {
        if(film.reviews.length) {
          console.log("Ye")
        }
      })
    })

      console.log(results)   


    // const listOfCriteriaValues = {'Diversity': true, 'Queer Friendliness': true, 'Gender Equality': true}
    // const listOfHighestScores = []
    // // films with highest diversity score
    // // films with highest normal score
    // const filterObject = {}
    // const listOfFilterObjects = []

    // const preparedCriteria = await this.querySelectedReviewCriteria(
    //   listOfCriteriaValues
    // );

    //   const test = await this.model
    //   .find(
    //     this.model.find({reviews: { $in: preparedCriteria }})
    //   )
    //   .then((res) => {
    //     let count = 0
    //     for (const entry of res) {
    //       count+=1
    //       console.log(entry)
    //       //filterObject.criterion =
    //       //listOfFilterObjects.push(filterObject)
    //     }
    //     console.log(count)
    //   })
    //   .catch((error) => console.log(error))
      
    //   console.log(test)

    // console.log(listOfFilterObjects)

    //this.filterByQuery()

    // for each value I need object
    // object always holds value result + filmId
    return listOfHighestScores
  }

  filterByQuery(query) {
    return this.model
  }

  async getAllGenres() {
    const genreList = []
    const allFilms = await this.findAll()

    for (let entry of allFilms) {
      if(entry.genres) {
        const genres = entry.genres.split(", ")
        for (const genre of genres) {
          if (!genreList.includes(genre)) {
            genreList.push(genre)
          }
        }
      }
    }
    return genreList
  }

  async findByUserSearch(query) {
    if ("advancedSearch" in query) return await this.advancedSearch(query);
    else return await this.simpleSearch(query);
  }

  async filterEntriesBasedOnUserSelection(selectedReviewCriteria, selectedGenres, selectedReleaseDate, operator) {
    const results = []
    const preparedCriteria = await this.querySelectedReviewCriteria(selectedReviewCriteria)
    const preparedGenres = this.querySelectedGenres(selectedGenres)
    
    if(operator == 'and') {
      await this.model
      .find(
        this.model.find({
          $and: [
            { genres: { $regex: preparedGenres, $options: "i" } },
            { year: selectedReleaseDate },
            { reviews: { $in: preparedCriteria } },
          ],
        })
      )
      .then((res) => {
        for (const entry of res) {
          results.push(entry)
        }
      })
      .catch((error) => console.log(error))
      return results
    }
    
    else if (operator == 'or') {
      await this.model
        .find(
          this.model.find({
            $or: [
              { genres: { $regex: preparedGenres, $options: "i" } },
              { year: selectedReleaseDate },
              { reviews: { $in: preparedCriteria } },
            ],
          })
        )
        .then((res) => {
          const results = []
          for (const entry of res) {
            results.push(entry)
          }
          return results
        })
        .catch((error) => console.log(error))
        return results
      }      
  }

  async advancedSearch(query) {
    console.log("advancedSearch")
    const selectedGenres = query.selectedGenre
    const selectedReviewCriteria = query.selectedReviewCriteria
    const selectedReleaseDate = query.selectedReleaseDate
    let results = []

    // when all query parameters are filled
    if (
      (Object.keys(selectedGenres).length != 0 ||
        selectedGenres.constructor != Object) &&
      (Object.keys(selectedReviewCriteria).length != 0 ||
        selectedReviewCriteria.constructor != Object) &&
      selectedReleaseDate != ""
    ) {
      console.log("ReviewCriteria & Genre & Year selected");
      await this.filterEntriesBasedOnUserSelection(
        selectedReviewCriteria, 
        selectedGenres, 
        selectedReleaseDate, 
        'and').then((response) => {
          return results = response
        })
      }
        
    else if (
      Object.keys(selectedGenres).length != 0 ||
      selectedGenres.constructor != Object ||
      Object.keys(selectedReviewCriteria).length != 0 ||
      selectedReviewCriteria.constructor != Object ||
      selectedReleaseDate != ""
    ) {
      console.log("ReviewCriteria OR Genre OR Year selected")
      await this.filterEntriesBasedOnUserSelection(
        selectedReviewCriteria, 
        selectedGenres, 
        selectedReleaseDate, 
        'or').then((response) => {
          return results = response
        })
    }
    return results
  }

  async querySelectedReviewCriteria(selectedReviewCriteria) {
    const criteriaList = [];
    const filmsWithSelectedCriteria = [];

    for (const [key, value] of Object.entries(selectedReviewCriteria)) {
      if (value === true) {
        criteriaList.push(key);
      }
    }

    const allReviewedFilms = await reviewRepo.findAllReviewedFilms();

    for (const entry of allReviewedFilms) {
      for (const selectedCriterion of criteriaList) {
        for (const criterion of entry.reviewCriteria) {
          if (criterion.name == selectedCriterion)
            filmsWithSelectedCriteria.push(entry._id);
        }
      }
    }

    // check and store true values in criteria object
    for (const [key, value] of Object.entries(selectedReviewCriteria)) {
      if (value === true) {
        criteriaList.push(key);
      }
    }

    return filmsWithSelectedCriteria;
  }

  querySelectedGenres(selectedGenres) {
    const genreList = [];
    let genreRegexExp = "";

    // check and store true values in genre object, e.g. { Drama : true }
    for (const [key, value] of Object.entries(selectedGenres)) {
      if (value === true) {
        genreList.push(key);
      }
    }
    // create regex expression of (possibly multiple) selected genres
    let iterator = 0;
    for (const entry of genreList) {
      if (genreList.length === 1) genreRegexExp += entry;
      else {
        iterator += 1;
        if (iterator != genreList.length) genreRegexExp += entry + "|";
        else genreRegexExp += entry;
      }
    }

    return genreRegexExp;
  }

  simpleSearch(query) {
    console.log("simpleTitleSearch")
    return this.titleSearch(query)
  }

  async titleSearch(query) {
    const matches = []
    const listOfFilms = []
    await this.findAll()
      .then((result) => {
        listOfFilms.push(result)
      })
      .catch((error) => {
        console.log(error)
      })

    let result = 100;
    for (const entry of listOfFilms[0]) {
      if (entry.title != null) {
        const cost = await this.calculateLevenstheinDistance(
          entry.title,
          query
        )
        if (cost < result) result = cost
        if (cost < 7) matches.push(entry)
      }
    }
    return matches
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
        // lower cost with -1 if characters are the same
        if (string1.charAt(i - 1) == string2.charAt(j - 1))
          matrix[i][j] = matrix[i - 1][j - 1] - 1;
        // if character is different, take minimum of three surrounding values
        // in matrix (left, diagonal, top)
        else
          matrix[i][j] =
            Math.min(matrix[i - 1][j], matrix[i - 1][j - 1], matrix[i][j - 1]) +
            1;
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

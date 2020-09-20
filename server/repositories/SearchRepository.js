const Film = require('../models/Film')
const reviewRepo = require('../repositories/ReviewRepository')

class SearchRepository {
  constructor(model) {
    this.model = model
  }

  // Retrieve all films
  findAll() {
    return this.model.find()
  }

  async findByUserSearch(query) {
    if ('advancedSearch' in query) return await this.advancedSearch(query)
    else return await this.simpleSearch(query)
  }

  async filterEntriesBasedOnUserSelection(
    selectedReviewCriteria,
    selectedGenres,
    selectedReleaseDate,
    operator
  ) {
    let results = []
    const reviewsContainingSelectedCriteria = await this.querySelectedReviewCriteria(
      selectedReviewCriteria
    )
    const preparedGenres = this.querySelectedGenres(selectedGenres)

    if (operator == 'and') {
      await this.model
        .find({
          $and: [
            { genres: { $regex: preparedGenres, $options: 'i' } },
            { year: selectedReleaseDate },
            { reviews: { $in: reviewsContainingSelectedCriteria } },
          ],
        })
        .then((response) => {
          return (results = response)
        })
        .catch((error) => console.log(error))
      return results
    } else if (operator == 'or') {
      await this.model
        .find({
          $or: [
            { genres: { $regex: preparedGenres, $options: 'i' } },
            { year: selectedReleaseDate },
            { reviews: { $in: reviewsContainingSelectedCriteria } },
          ],
        })
        .then((response) => {
          return (results = response)
        })
        .catch((error) => console.log(error))
      return results
    }
  }

  async advancedSearch(query) {
    console.log('advancedSearch')
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
      selectedReleaseDate != ''
    ) {
      console.log('ReviewCriteria & Genre & Year selected')
      await this.filterEntriesBasedOnUserSelection(
        selectedReviewCriteria,
        selectedGenres,
        selectedReleaseDate,
        'and'
      ).then((response) => {
        return (results = response)
      })
    } else if (
      Object.keys(selectedGenres).length != 0 ||
      selectedGenres.constructor != Object ||
      Object.keys(selectedReviewCriteria).length != 0 ||
      selectedReviewCriteria.constructor != Object ||
      selectedReleaseDate != ''
    ) {
      console.log('ReviewCriteria OR Genre OR Year selected')
      await this.filterEntriesBasedOnUserSelection(
        selectedReviewCriteria,
        selectedGenres,
        selectedReleaseDate,
        'or'
      ).then((response) => {
        return (results = response)
      })
    }
    return results
  }

  async querySelectedReviewCriteria(selectedReviewCriteria) {
    const criteriaList = []
    const filmsWithSelectedCriteria = []

    for (const [key, value] of Object.entries(selectedReviewCriteria)) {
      if (value === true) {
        criteriaList.push(key)
      }
    }

    const allReviews = await reviewRepo.findAll()

    for (const entry of allReviews) {
      for (const selectedCriterion of criteriaList) {
        for (const criterion of entry.reviewCriteria) {
          if (criterion.name == selectedCriterion)
            filmsWithSelectedCriteria.push(entry._id)
        }
      }
    }

    // check and store true values in criteria object
    for (const [key, value] of Object.entries(selectedReviewCriteria)) {
      if (value === true) {
        criteriaList.push(key)
      }
    }
    return filmsWithSelectedCriteria
  }

  querySelectedGenres(selectedGenres) {
    const genreList = []
    let genreRegexExp = ''

    // check and store true values in genre object, e.g. { Drama : true }
    for (const [key, value] of Object.entries(selectedGenres)) {
      if (value === true) {
        genreList.push(key)
      }
    }
    // create regex expression with logical OR of (possibly multiple) selected genres
    let iterator = 0
    for (const entry of genreList) {
      if (genreList.length === 1) genreRegexExp += entry
      else {
        iterator += 1
        if (iterator != genreList.length) genreRegexExp += entry + '|'
        else genreRegexExp += entry
      }
    }
    return genreRegexExp
  }

  simpleSearch(query) {
    console.log('simpleTitleSearch')
    return this.titleSearch(query)
  }

  async titleSearch(query) {
    let matches = []
    let listOfFilms = []
    await this.findAll()
      .then((result) => {
        listOfFilms = result
      })
      .catch((error) => {
        console.log(error)
      })

    let result = 100
    for (const entry of listOfFilms) {
      if (entry.title != null) {
        // check if query has exact match and break out of loop if true
        if (entry.title.toUpperCase() == query.toUpperCase()) {
          matches = []
          matches.push(entry)
          break
        }
        // calculate result based on Levensthein distance
        else {
          const cost = await this.calculateLevenstheinDistance(
            entry.title,
            query
          )
          if (cost < result) result = cost
          if (cost < 7) matches.push(entry)
        }
      }
    }
    if (matches.length > 1) return matches.splice(0, 14)
    else return matches
  }

  // Reference: https://www.geeksforgeeks.org/edit-distance-dp-5/
  // Reference: https://www.youtube.com/watch?v=We3YDTzNXEk
  calculateLevenstheinDistance(string1, string2) {
    let matrix = []

    const length1 = string1.length
    const length2 = string2.length

    // if one string is empty, all characters of other string need
    // to be inserted into the first one and vice versa
    if (length1 == 0) return length2
    if (length2 == 0) return length1

    // create empty 2D array (matrix) based on input string lengths
    matrix = new Array(length1)

    for (let i = 0; i <= length1; i++) {
      matrix[i] = new Array(length2)
    }

    // add string indices to matrix
    for (let i = 0; i <= length1; i++) matrix[i][0] = i
    for (let j = 0; j <= length2; j++) matrix[0][j] = j

    for (let i = 1; i <= length1; i++) {
      for (let j = 1; j <= length2; j++) {
        // if character is the same, take diagonal value
        // lower cost with -1 if characters are the same
        if (string1.charAt(i - 1) == string2.charAt(j - 1))
          matrix[i][j] = matrix[i - 1][j - 1] - 1
        // if character is different, take minimum of three surrounding values
        // in matrix (left, diagonal, top)
        else
          matrix[i][j] =
            Math.min(matrix[i - 1][j], matrix[i - 1][j - 1], matrix[i][j - 1]) +
            1
      }
    }
    return matrix[length1][length2]
  }
}

module.exports = new SearchRepository(Film)

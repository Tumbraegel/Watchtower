const Film = require('../models/Film');
const filmRepo = require('../repositories/FilmRepository');

class SearchRepository {
    constructor(model) {
        this.model = model;
    }

}

module.exports = new SearchRepository(Film)
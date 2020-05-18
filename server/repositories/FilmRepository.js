const Film = require('../models/Film');

class FilmRepository {
    constructor(model) {
        this.model = model;
    }

    // Retrieve all films
    findAll() {
        return this.model.find();
    }

    // Retrieve film by id
    findById(id) {
        return this.model.findById(id);
    }
}

module.exports = new FilmRepository(Film);
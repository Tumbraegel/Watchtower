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

    findByGenre(genre) {
        return this.model.find({ genres: genre});
    }

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
            imdbID: film.imdbID
        };
        // Check if film already in db
        if(this.model.find({ imdbID: film.imdbID}))
        {
            console.log(film.Title + " already exists in database.");
        }
        else {
            const newFilm = new this.model(entry);
            return newFilm.save();
        }
    }
}

module.exports = new FilmRepository(Film);
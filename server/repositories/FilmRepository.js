const Film = require('../models/Film');

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

    // Retrieve film by specific genre
    findByGenre(genre) {
        return this.model.find({ genres: genre });
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
            imdbID: film.imdbID
        };
        const newFilm = new this.model(entry);
        return newFilm.save(function (err, res) {
            if (err) {
                console.log("\'" + film.Title + "\'" + " already exists in database.");
            }
            else {
                console.log("\'" + film.Title + "\'" + "  successfully stored in database.");
            }
        })
    }
}

module.exports = new FilmRepository(Film);
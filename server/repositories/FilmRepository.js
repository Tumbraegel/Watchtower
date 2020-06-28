const Film = require('../models/Film');

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
        return this.model.find({reviewCriteria: {$exists: true, $not: {$size: 0}}})
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
            imdbID: film.imdbID
        };
        const newFilm = new this.model(entry);
        return newFilm.save().then(function (err, res) {
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
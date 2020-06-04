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
        return this.model.find({ imdbID: id });
    }

    // Retrieve film by specific genre
    findByGenre(genre) {
        return this.model.find({ genres: genre });
    }

    addReview(id, data) {
        const film = { imdbID: id };
        const update = { reviewCriteria: data }
        return this.model.findOneAndUpdate(film, update, function (err, res) {
            if (err) {
                console.log("There was an error in updating the film data.");
            }
            else {
                console.log("Film was successfully updated.");
            }
        });
/*
        film.reviewCriteria.push(data);
        //return this.model.find({ imdbID: id });
        return film.save(function (err, res) {
            if (err) {
                console.log("\'" + film.Title + "\'" + " didn't get updated.");
            }
            else {
                console.log("\'" + film.Title + "\'" + "  was successfully updated.");
            }
        })*/
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
const { HTTP_STATUS_CREATED } = require('http2').constants;
const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../utils/errors/BadRequest');
const NotFoundError = require('../utils/errors/NotFound');
const ForbiddenError = require('../utils/errors/Forbidden');

module.exports.addMovie = (req, res, next) => {
  const {
    country, director, duration, description, year, image,
     trailerLink, thumbnail, movieId, nameRU, nameEN,
    } = req.body;
  Movie.create({
    country, director, duration, description, year, image,
     trailerLink, thumbnail, movieId, nameRU, nameEN, owner: req.user._id,
    })
    .then((movie) => res.status(HTTP_STATUS_CREATED).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({}).sort({ createdAd: -1 })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(`Видео с id-${req.params.movieId} не найдено`))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) return next(new ForbiddenError());
      return Movie.deleteOne(movie).then(() => res.send({ message: `Видео ${movie._id} удалено` }));
    })
    .catch(next);
};
